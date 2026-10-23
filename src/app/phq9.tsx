import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { guardarRespostasPHQ9 } from "../store/avaliacaoStore";
import { CORES } from "../constants/cores";
import { IMAGENS_PHQ9 } from "../constants/imagensQuestionario";

const PERGUNTAS = [
  "Pouco interesse ou prazer em fazer as coisas",
  "Sentir-se em baixo, deprimido(a) ou sem esperança",
  "Dificuldade em adormecer, manter o sono, ou dormir demais",
  "Sentir-se cansado(a) ou com pouca energia",
  "Falta de apetite ou comer em excesso",
  "Sentir-se mal consigo mesmo(a) ou que é um fracasso, ou que desiludiu a sua família ou a si mesmo(a)",
  "Dificuldade em concentrar-se em coisas como ler o jornal ou ver televisão",
  "Lentidão a mexer-se ou a falar, a ponto de poder ter sido notado ou o oposto, estar tão agitado(a) que se tem mexido muito mais do que o costume",
  "Pensamentos de que seria melhor estar morto(a), ou de fazer mal a si mesmo(a) de alguma forma",
];

const OPCOES = [
  { valor: 0, texto: "Nunca" },
  { valor: 1, texto: "Vários dias" },
  { valor: 2, texto: "Mais de metade dos dias" },
  { valor: 3, texto: "Quase todos os dias" },
];

const FUNDOS = [CORES.azul, CORES.lilas, CORES.pessego, CORES.verde, CORES.coral];

export default function PHQ9() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<number[]>(new Array(9).fill(-1));

  const respostaAtual = respostas[indice];
  const ultimaPergunta = indice === PERGUNTAS.length - 1;
  const corFundo = FUNDOS[indice % FUNDOS.length];

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
        <TouchableOpacity onPress={sair} style={styles.botaoSair}>
          <Text style={styles.textoSair}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.conteudo}>
        <View style={styles.card}>
          <Image source={IMAGENS_PHQ9[indice]} style={styles.imagem} resizeMode="contain" />

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
          {indice > 0 && (
            <TouchableOpacity style={styles.botaoVoltar} onPress={voltar}>
              <Text style={styles.textoBotaoVoltar}>Voltar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: corFundo },
              respostaAtual === -1 && styles.botaoDesativado,
            ]}
            onPress={avancar}
            disabled={respostaAtual === -1}
          >
            <Text style={styles.textoBotao}>{ultimaPergunta ? "Continuar" : "Seguinte"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topo: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, gap: 12 },
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