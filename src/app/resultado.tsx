import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const CORES_RISCO: Record<string, string> = {
  "mínimo": "#4CAF7D",
  "leve": "#8BC34A",
  "moderado": "#F5A623",
  "moderadamente severo": "#E8743B",
  "severo": "#D64545",
};

const RECURSOS_PADRAO = [
  "Fala com alguém em quem confies sobre como te tens sentido.",
  "Considera procurar apoio junto dos serviços de saúde mental da tua zona.",
  "Cuidar do sono, alimentação e exercício físico pode ajudar no teu bem-estar geral.",
];

export default function Resultado() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const pontuacaoPHQ9 = params.pontuacao_phq9;
  const pontuacaoGAD7 = params.pontuacao_gad7;
  const categoriaPHQ9 = String(params.categoria_risco_phq9 || "");
  const categoriaGAD7 = String(params.categoria_risco_gad7 || "");
  const riscoUrgente = params.risco_urgente === "true";

  const corPHQ9 = CORES_RISCO[categoriaPHQ9] || "#6B7280";
  const corGAD7 = CORES_RISCO[categoriaGAD7] || "#6B7280";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>O teu resultado</Text>

        {riscoUrgente && (
          <View style={styles.avisoUrgente}>
            <Text style={styles.tituloUrgente}>Importante</Text>
            <Text style={styles.textoUrgente}>
              Notámos que mencionaste ter tido pensamentos de fazer mal a
              ti mesmo(a). Não estás sozinho(a), e existe ajuda disponível.
              Por favor, fala com alguém de confiança ou procura apoio
              profissional o mais rápido possível.
            </Text>
          </View>
        )}

        <View style={[styles.cartao, { borderColor: corPHQ9 }]}>
          <Text style={styles.rotulo}>Depressão (PHQ-9)</Text>
          <Text style={styles.pontuacao}>{pontuacaoPHQ9} / 27</Text>
          <Text style={[styles.categoria, { color: corPHQ9 }]}>
            {categoriaPHQ9}
          </Text>
        </View>

        <View style={[styles.cartao, { borderColor: corGAD7 }]}>
          <Text style={styles.rotulo}>Ansiedade (GAD-7)</Text>
          <Text style={styles.pontuacao}>{pontuacaoGAD7} / 21</Text>
          <Text style={[styles.categoria, { color: corGAD7 }]}>
            {categoriaGAD7}
          </Text>
        </View>

        <Text style={styles.subtitulo}>O que podes fazer agora</Text>
        {RECURSOS_PADRAO.map((recurso, i) => (
          <Text key={i} style={styles.recurso}>• {recurso}</Text>
        ))}

        <Text style={styles.aviso}>
          Este resultado é apenas uma indicação de rastreio, não um
          diagnóstico. Só um profissional de saúde pode fazer uma avaliação
          clínica completa.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.textoBotao}>Concluir</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  conteudo: { padding: 24, paddingBottom: 48 },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A1A2E",
    textAlign: "center",
    marginBottom: 24,
  },
  avisoUrgente: {
    backgroundColor: "#FDECEC",
    borderWidth: 1,
    borderColor: "#D64545",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  tituloUrgente: {
    fontWeight: "bold",
    color: "#D64545",
    marginBottom: 6,
    fontSize: 16,
  },
  textoUrgente: {
    color: "#3A3A3A",
    fontSize: 14,
    lineHeight: 20,
  },
  cartao: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  rotulo: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  pontuacao: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A1A2E",
  },
  categoria: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
    textTransform: "capitalize",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A2E",
    marginTop: 12,
    marginBottom: 12,
  },
  recurso: {
    fontSize: 15,
    color: "#3A3A3A",
    marginBottom: 8,
    lineHeight: 22,
  },
  aviso: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 20,
    marginBottom: 24,
    fontStyle: "italic",
    lineHeight: 18,
  },
  botao: {
    backgroundColor: "#4A6FA5",
    paddingVertical: 16,
    borderRadius: 12,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});