import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { obterRespostasPHQ9, guardarRespostasGAD7 } from "../store/avaliacaoStore";

const API_URL = "http://192.168.100.4:5000";

const PERGUNTAS = [
  "Sentir-se nervoso(a), ansioso(a) ou muito tenso(a)",
  "Não conseguir parar ou controlar a preocupação",
  "Preocupar-se demasiado com coisas diferentes",
  "Dificuldade em relaxar",
  "Estar tão inquieto(a) que é difícil ficar parado(a)",
  "Ficar facilmente irritado(a) ou irritável",
  "Sentir medo, como se algo terrível fosse acontecer",
];

const OPCOES = [
  { valor: 0, texto: "Nunca" },
  { valor: 1, texto: "Vários dias" },
  { valor: 2, texto: "Mais de metade dos dias" },
  { valor: 3, texto: "Quase todos os dias" },
];

export default function GAD7() {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<number[]>(new Array(7).fill(-1));
  const [aEnviar, setAEnviar] = useState(false);

  const respostaAtual = respostas[indice];
  const ultimaPergunta = indice === PERGUNTAS.length - 1;

  function selecionar(valor: number) {
    const novas = [...respostas];
    novas[indice] = valor;
    setRespostas(novas);
  }

  async function avancar() {
    if (respostaAtual === -1) return;

    if (!ultimaPergunta) {
      setIndice(indice + 1);
      return;
    }

    // Última pergunta respondida -> submeter tudo ao backend
    guardarRespostasGAD7(respostas);
    setAEnviar(true);

    try {
      const uuid = await AsyncStorage.getItem("arsm_uuid");
      const respostasPHQ9 = obterRespostasPHQ9();

      const resposta = await fetch(`${API_URL}/api/avaliacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid,
          respostas_phq9: respostasPHQ9,
          respostas_gad7: respostas,
        }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        alert(resultado.erro || "Ocorreu um erro ao processar a avaliação.");
        setAEnviar(false);
        return;
      }

      router.push({
        pathname: "/resultado",
        params: {
          pontuacao_phq9: resultado.pontuacao_phq9,
          pontuacao_gad7: resultado.pontuacao_gad7,
          categoria_risco_phq9: resultado.categoria_risco_phq9,
          categoria_risco_gad7: resultado.categoria_risco_gad7,
          risco_urgente: String(resultado.risco_urgente),
        },
      });
    } catch (erro) {
      alert("Não foi possível ligar ao servidor. Verifica a tua ligação.");
      console.error(erro);
      setAEnviar(false);
    }
  }

  function voltar() {
    if (indice > 0) setIndice(indice - 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.progresso}>
          Pergunta {indice + 1} de {PERGUNTAS.length}
        </Text>

        <Text style={styles.subtitulo}>
          Nas últimas 2 semanas, com que frequência foi incomodado(a) por:
        </Text>

        <Text style={styles.pergunta}>{PERGUNTAS[indice]}</Text>

        {OPCOES.map((opcao) => (
          <TouchableOpacity
            key={opcao.valor}
            style={[
              styles.opcao,
              respostaAtual === opcao.valor && styles.opcaoSelecionada,
            ]}
            onPress={() => selecionar(opcao.valor)}
          >
            <Text
              style={[
                styles.textoOpcao,
                respostaAtual === opcao.valor && styles.textoOpcaoSelecionada,
              ]}
            >
              {opcao.texto}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.navegacao}>
          {indice > 0 && !aEnviar && (
            <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
              <Text style={styles.textoBotaoVoltar}>Voltar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.botao, (respostaAtual === -1 || aEnviar) && styles.botaoDesativado]}
            onPress={avancar}
            disabled={respostaAtual === -1 || aEnviar}
          >
            {aEnviar ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.textoBotao}>
                {ultimaPergunta ? "Ver resultado" : "Seguinte"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  conteudo: { flex: 1, padding: 24, justifyContent: "center" },
  progresso: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 12,
  },
  pergunta: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A2E",
    textAlign: "center",
    marginBottom: 28,
  },
  opcao: {
    borderWidth: 2,
    borderColor: "#D0D5DD",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  opcaoSelecionada: {
    borderColor: "#4A6FA5",
    backgroundColor: "#E8EEF7",
  },
  textoOpcao: {
    fontSize: 15,
    color: "#3A3A3A",
    textAlign: "center",
  },
  textoOpcaoSelecionada: {
    color: "#4A6FA5",
    fontWeight: "600",
  },
  navegacao: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  botaoVoltar: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  textoBotaoVoltar: {
    color: "#6B7280",
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#4A6FA5",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 1,
    marginLeft: 12,
  },
  botaoDesativado: {
    backgroundColor: "#B0B8C4",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});