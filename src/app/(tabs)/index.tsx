import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CORES } from "../../constants/cores";

const INFO = [
  { icon: "time-outline" as const, texto: "3-5 minutos" },
  { icon: "list-outline" as const, texto: "16 perguntas" },
  { icon: "shield-checkmark-outline" as const, texto: "100% anónimo" },
];

export default function Inicio() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 110 }}
    >
      <View style={styles.cabecalho}>
        <Text style={styles.saudacao}>Olá</Text>
        <Text style={styles.subSaudacao}>Como te sentes hoje?</Text>
      </View>

      <LinearGradient colors={[CORES.pessego, CORES.coral]} style={styles.cartaoTopo}>
        <View style={styles.iconeCirculo}>
          <Ionicons name="clipboard-outline" size={32} color="#FFFFFF" />
        </View>

        <Text style={styles.tituloTopo}>Rastreio de saúde mental</Text>
        <Text style={styles.textoTopo}>
          Um momento tranquilo para perceberes como tens estado em relação à
          depressão e à ansiedade, de forma simples e privada.
        </Text>

        <TouchableOpacity style={styles.botao} onPress={() => router.push("/phq9")}>
          <Text style={styles.textoBotao}>Iniciar avaliação</Text>
          <Ionicons name="arrow-forward" size={18} color={CORES.coral} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.linhaInfo}>
        {INFO.map((item, i) => (
          <View key={i} style={styles.itemInfo}>
            <Ionicons name={item.icon} size={20} color={CORES.azul} />
            <Text style={styles.textoInfo}>{item.texto}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.cartaoLink, { marginTop: 24 }]} onPress={() => router.push("/respirar")}>
        <Ionicons name="leaf-outline" size={22} color={CORES.azul} />
        <View style={{ flex: 1 }}>
          <Text style={styles.tituloLink}>Respirar</Text>
          <Text style={styles.textoLink}>Um exercício de respiração calma</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.cartaoLink, { marginTop: 12 }]} onPress={() => router.push("/humor")}>
        <Ionicons name="happy-outline" size={22} color={CORES.azul} />
        <View style={{ flex: 1 }}>
          <Text style={styles.tituloLink}>Humor de hoje</Text>
          <Text style={styles.textoLink}>Regista como te sentes</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.cartaoLink, { marginTop: 12 }]} onPress={() => router.push("/diario")}>
  <Ionicons name="book-outline" size={22} color={CORES.azul} />
  <View style={{ flex: 1 }}>
    <Text style={styles.tituloLink}>Diário</Text>
    <Text style={styles.textoLink}>Escreve o que estás a sentir</Text>
  </View>
  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
</TouchableOpacity>

      <View style={styles.secaoExtra}>
        <Text style={styles.tituloExtra}>Porque fazer o rastreio?</Text>
        <Text style={styles.textoExtra}>
          Reconhecer sinais precocemente é o primeiro passo para cuidares de
          ti. Este rastreio não substitui uma avaliação profissional, mas pode
          ajudar-te a perceber quando pedir apoio.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF8" },
  cabecalho: { paddingHorizontal: 20, marginBottom: 16 },
  saudacao: { fontSize: 22, fontWeight: "bold", color: CORES.textoEscuro },
  subSaudacao: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  cartaoTopo: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
  },
  iconeCirculo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  tituloTopo: {
    fontSize: 20,
    fontWeight: "bold",
    color: CORES.textoEscuro,
    textAlign: "center",
    marginBottom: 8,
  },
  textoTopo: {
    fontSize: 14,
    color: CORES.textoEscuro,
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.85,
    marginBottom: 22,
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  textoBotao: { color: CORES.coral, fontSize: 16, fontWeight: "700" },
  linhaInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    marginHorizontal: 20,
  },
  itemInfo: { alignItems: "center", gap: 6 },
  textoInfo: { fontSize: 12, color: "#6B7280" },
  cartaoLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginHorizontal: 20,
  },
  tituloLink: { fontSize: 15, fontWeight: "700", color: CORES.textoEscuro },
  textoLink: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  secaoExtra: {
    marginTop: 24,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  tituloExtra: { fontSize: 15, fontWeight: "700", color: CORES.textoEscuro, marginBottom: 8 },
  textoExtra: { fontSize: 13, color: "#6B7280", lineHeight: 19 },
});