import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CORES } from "../../../constants/cores";
import { ARTIGOS } from "../../../constants/artigos";

export default function Educacao() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + 12 }]}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>Saúde Mental</Text>
      <Text style={styles.subtitulo}>
        Informação simples para te ajudar a entender melhor
      </Text>

      <View style={styles.grelha}>
        {ARTIGOS.map((artigo) => (
          <TouchableOpacity
            key={artigo.id}
            style={[styles.cartao, { backgroundColor: artigo.cor + "25" }]}
            onPress={() => router.push(`/educacao/${artigo.id}`)}
          >
            <Image source={artigo.imagem} style={styles.imagemCartao} resizeMode="contain" />
            <View style={styles.rodapeCartao}>
              <Text style={styles.tituloCartao}>{artigo.titulo}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF8" },
  conteudo: { paddingHorizontal: 20, paddingBottom: 24 },
  titulo: { fontSize: 24, fontWeight: "bold", color: CORES.textoEscuro },
  subtitulo: { fontSize: 14, color: "#6B7280", marginTop: 4, marginBottom: 20 },
  grelha: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cartao: {
    width: "48%",
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
    height: 170,
    justifyContent: "flex-end",
  },
  imagemCartao: {
    width: "100%",
    height: 110,
    marginTop: 10,
  },
  rodapeCartao: {
    backgroundColor: "#FFFFFF",
    padding: 12,
  },
  tituloCartao: {
    fontSize: 13,
    fontWeight: "700",
    color: CORES.textoEscuro,
  },
});