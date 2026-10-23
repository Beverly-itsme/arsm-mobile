import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { obterRespostasPHQ9, guardarRespostasGAD7 } from "../store/avaliacaoStore";
import { CORES } from "../constants/cores";
import { IMAGENS_GAD7 } from "../constants/imagensQuestionario";

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

const FUNDOS = [CORES.coral, CORES.pessego, CORES.lilas, CORES.azul, CORES.verde];

export default function GAD7() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<number[]>(new Array(7).fill(-1));
  const [aEnviar, setAEnviar] = useState(false);

  const respostaAtual = respostas[indice];
  const ultimaPergunta = indice === PERGUNTAS.length - 1;
  const corFundo = FUNDOS[indice % FUNDOS.length];

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
    <View style={[styles.container, { backgroundColor: corFundo + "18", paddingTop: insets.top + 12 }]}>
      <View style={styles.topo}>
        <View style={styles.barraProgresso}>
          <View
            style={[
              styles.barraProgressoPreenchida,
              { width: `${((indice + 1) / PERGUNTAS.length) * 100}%`, backgroundColor: corFundo },
            ]}
          />
        </View>
        {!aEnviar && (
          <TouchableOpacity onPress={sair} style={styles.botaoSair}>
            <Text style={styles.textoSair}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.conteudo}>
        <View style={styles.card}>
          <Image source={IMAGENS_GAD7[indice]} style={styles.imagem} resizeMode="contain" />

          <Text style={styles.progresso}>Pergunta {indice + 1} de {PERGUNTAS.length}</Text>
          <Text style={styles.pergunta}>{PERGUNTAS[indice]}</Text>

          {OPCOES.map((opcao) => (
            <TouchableOpacity
              key={opcao.valor}
              style={[
                styles.opcao,
                respostaAtual === opcao.valor && { borderColor: corFundo, backgroundColor: corFundo + "15" },
              ]}
              onPress={() => selecionar(opcao.valor)}
            >
              <Text
                style={[
                  styles.textoOpcao,
                  respostaAtual === opcao.valor && { color: corFundo, fontWeight: "700" },
                ]}
              >
                {opcao.texto}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navegacao}>
          {indice > 0 && !aEnviar && (
            <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
              <Text style={styles.textoBotaoVoltar}>Voltar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: corFundo },
              (respostaAtual === -1 || aEnviar) && styles.botaoDesativado,
            ]}
            onPress={avancar}
            disabled={respostaAtual === -1 || aEnviar}
          >
            {aEnviar ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.textoBotao}>{ultimaPergunta ? "Ver resultado" : "Seguinte"}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topo: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, gap: 12, minHeight: 32 },
  barraProgresso: { flex: 1, height: 6, backgroundColor: "#FFFFFF", borderRadius: 3, overflow: "hidden" },
  barraProgressoPreenchida: { height: "100%", borderRadius: 3 },
  botaoSair: { padding: 4 },
  textoSair: { fontSize: 18, color: "#6B7280" },
  conteudo: { flex: 1, padding: 20, justifyContent: "center" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  imagem: { width: 140, height: 140, marginBottom: 12 },
  progresso: { fontSize: 13, color: "#9CA3AF", marginBottom: 6 },
  pergunta: {
    fontSize: 19,
    fontWeight: "700",
    color: CORES.textoEscuro,
    textAlign: "center",
    marginBottom: 24,
  },
  opcao: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  textoOpcao: { fontSize: 15, color: CORES.textoEscuro, textAlign: "center" },
  navegacao: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  botaoVoltar: { paddingVertical: 16, paddingHorizontal: 8 },
  textoBotaoVoltar: { color: "#6B7280", fontSize: 16 },
  botao: { flex: 1, paddingVertical: 16, borderRadius: 30 },
  botaoDesativado: { backgroundColor: "#C4CCD6" },
  textoBotao: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", textAlign: "center" },
});