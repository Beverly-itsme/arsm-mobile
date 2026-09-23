import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { guardarRespostasPHQ9 } from "../store/avaliacaoStore";

const PERGUNTAS = [
  "Pouco interesse ou prazer em fazer as coisas",
  "Sentir-se em baixo, deprimido(a) ou sem esperança",
  "Dificuldade em adormecer, manter o sono, ou dormir demais",
  "Sentir-se cansado(a) ou com pouca energia",
  "Falta de apetite ou comer em excesso",
  "Sentir-se mal consigo mesmo(a) — ou que é um fracasso, ou que desiludiu a sua família ou a si mesmo(a)",
  "Dificuldade em concentrar-se em coisas como ler o jornal ou ver televisão",
  "Lentidão a mexer-se ou a falar, a ponto de poder ter sido notado — ou o oposto, estar tão agitado(a) que se tem mexido muito mais do que o costume",
  "Pensamentos de que seria melhor estar morto(a), ou de fazer mal a si mesmo(a) de alguma forma",
];

const OPCOES = [
  { valor: 0, texto: "Nunca" },
  { valor: 1, texto: "Vários dias" },
  { valor: 2, texto: "Mais de metade dos dias" },
  { valor: 3, texto: "Quase todos os dias" },
];

export default function PHQ9() {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<number[]>(new Array(9).fill(-1));

  const respostaAtual = respostas[indice];
  const ultimaPergunta = indice === PERGUNTAS.length - 1;

  function selecionar(valor: number) {
    const novas = [...respostas];
    novas[indice] = valor;
    setRespostas(novas);
  }

  function avancar() {
    if (respostaAtual === -1) return;

    if (ultimaPergunta) {
      guardarRespostasPHQ9(respostas);
      router.push("/gad7");
    } else {
      setIndice(indice + 1);
    }
  }

  function voltar() {
    if (indice > 0) setIndice(indice - 1);
  }

  function sair() {
    Alert.alert(
      "Sair da avaliação?",
      "As tuas respostas até agora serão perdidas.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: () => router.replace("/(tabs)") },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <TouchableOpacity onPress={sair} style={styles.botaoSair}>
          <Text style={styles.textoSair}>✕ Sair</Text>
        </TouchableOpacity>

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
          {indice > 0 && (
            <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
              <Text style={styles.textoBotaoVoltar}>Voltar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.botao, respostaAtual === -1 && styles.botaoDesativado]}
            onPress={avancar}
            disabled={respostaAtual === -1}
          >
            <Text style={styles.textoBotao}>
              {ultimaPergunta ? "Continuar" : "Seguinte"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  conteudo: { flex: 1, padding: 24, justifyContent: "center" },
  botaoSair: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  textoSair: {
    color: "#6B7280",
    fontSize: 14,
  },
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