import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { CORES } from "../constants/cores";

const CORES_RISCO: Record<string, string> = {
  "mínimo": "#4CAF7D",
  "leve": "#8BC34A",
  "moderado": CORES.coral,
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
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const pontuacaoPHQ9 = params.pontuacao_phq9;
  const pontuacaoGAD7 = params.pontuacao_gad7;
  const categoriaPHQ9 = String(params.categoria_risco_phq9 || "");
  const categoriaGAD7 = String(params.categoria_risco_gad7 || "");
  const riscoUrgente = params.risco_urgente === "true";

  const corPHQ9 = CORES_RISCO[categoriaPHQ9] || "#6B7280";
  const corGAD7 = CORES_RISCO[categoriaGAD7] || "#6B7280";

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>O teu resultado</Text>

        {riscoUrgente && (
          <View style={styles.avisoUrgente}>
            <View style={styles.linhaAvisoTitulo}>
              <Ionicons name="alert-circle" size={20} color="#D64545" />
              <Text style={styles.tituloUrgente}>Importante</Text>
            </View>
            <Text style={styles.textoUrgente}>
              Notámos que mencionaste ter tido pensamentos de fazer mal a
              ti mesmo(a). Não estás sozinho(a), e existe ajuda disponível.
              Por favor, fala com alguém de confiança ou procura apoio
              profissional o mais rápido possível.
            </Text>
          </View>
        )}

        <View style={styles.linhaResultados}>
          <View style={[styles.cartaoResultado, { borderColor: corPHQ9 }]}>
            <Text style={styles.rotulo}>Depressão</Text>
            <Text style={styles.subrotulo}>PHQ-9</Text>
            <Text style={styles.pontuacao}>{pontuacaoPHQ9}<Text style={styles.pontuacaoMax}>/27</Text></Text>
            <View style={[styles.pilulaCategoria, { backgroundColor: corPHQ9 + "20" }]}>
              <Text style={[styles.textoCategoria, { color: corPHQ9 }]}>{categoriaPHQ9}</Text>
            </View>
          </View>

          <View style={[styles.cartaoResultado, { borderColor: corGAD7 }]}>
            <Text style={styles.rotulo}>Ansiedade</Text>
            <Text style={styles.subrotulo}>GAD-7</Text>
            <Text style={styles.pontuacao}>{pontuacaoGAD7}<Text style={styles.pontuacaoMax}>/21</Text></Text>
            <View style={[styles.pilulaCategoria, { backgroundColor: corGAD7 + "20" }]}>
              <Text style={[styles.textoCategoria, { color: corGAD7 }]}>{categoriaGAD7}</Text>
            </View>
          </View>
        </View>

        <View style={styles.secaoRecursos}>
          <Text style={styles.subtitulo}>O que podes fazer agora</Text>
          {RECURSOS_PADRAO.map((recurso, i) => (
            <View key={i} style={styles.linhaRecurso}>
              <View style={styles.bolinhaRecurso} />
              <Text style={styles.recurso}>{recurso}</Text>
            </View>
          ))}
        </View>

        <View style={styles.avisoLegal}>
          <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
          <Text style={styles.aviso}>
            Este resultado é apenas uma indicação de rastreio, não um
            diagnóstico. Só um profissional de saúde pode fazer uma
            avaliação clínica completa.
          </Text>
        </View>

        <TouchableOpacity style={styles.botao} onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.textoBotao}>Concluir</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF8" },
  conteudo: { padding: 20, paddingBottom: 40 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: CORES.textoEscuro,
    textAlign: "center",
    marginBottom: 20,
  },
  avisoUrgente: {
    backgroundColor: "#FDECEC",
    borderWidth: 1,
    borderColor: "#F2C4C4",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  linhaAvisoTitulo: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  tituloUrgente: { fontWeight: "700", color: "#D64545", fontSize: 15 },
  textoUrgente: { color: "#3A3A3A", fontSize: 13, lineHeight: 19 },
  linhaResultados: { flexDirection: "row", gap: 12, marginBottom: 20 },
  cartaoResultado: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  rotulo: { fontSize: 13, fontWeight: "600", color: CORES.textoEscuro },
  subrotulo: { fontSize: 11, color: "#9CA3AF", marginBottom: 10 },
  pontuacao: { fontSize: 30, fontWeight: "bold", color: CORES.textoEscuro },
  pontuacaoMax: { fontSize: 15, fontWeight: "400", color: "#9CA3AF" },
  pilulaCategoria: { marginTop: 10, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 20 },
  textoCategoria: { fontSize: 11, fontWeight: "700", textTransform: "capitalize" },
  secaoRecursos: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  subtitulo: { fontSize: 16, fontWeight: "700", color: CORES.textoEscuro, marginBottom: 14 },
  linhaRecurso: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12, gap: 10 },
  bolinhaRecurso: { width: 6, height: 6, borderRadius: 3, backgroundColor: CORES.azul, marginTop: 7 },
  recurso: { flex: 1, fontSize: 14, color: CORES.textoEscuro, lineHeight: 20 },
  avisoLegal: { flexDirection: "row", gap: 8, marginBottom: 24, paddingHorizontal: 4 },
  aviso: { flex: 1, fontSize: 12, color: "#9CA3AF", lineHeight: 17, fontStyle: "italic" },
  botao: {
    backgroundColor: CORES.azul,
    paddingVertical: 16,
    borderRadius: 30,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});