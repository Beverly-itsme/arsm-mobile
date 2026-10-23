import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { CORES } from "../../../constants/cores";
import { ARTIGOS } from "../../../constants/artigos";

export default function Artigo() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  const artigo = ARTIGOS.find((a) => a.id === id);

  if (!artigo) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
        <Text>Artigo não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView
  style={[styles.container, { paddingTop: insets.top + 12 }]}
  contentContainerStyle={{ paddingBottom: 40 }}
>
      <View style={[styles.cabecalho, { backgroundColor: artigo.cor + "20" }]}>
        <TouchableOpacity onPress={() => router.replace("/educacao")} style={styles.botaoVoltar}>
          <Ionicons name="arrow-back" size={22} color={CORES.textoEscuro} />
        </TouchableOpacity>

        <Image source={artigo.imagem} style={styles.imagemGrande} resizeMode="contain" />
        <Text style={styles.titulo}>{artigo.titulo}</Text>
      </View>

      <View style={styles.corpo}>
        <Text style={styles.texto}>{artigo.conteudo}</Text>

        <View style={[styles.caixaFacto, { borderColor: artigo.cor }]}>
          <View style={styles.linhaFactoTitulo}>
            <Ionicons name="bulb-outline" size={18} color={artigo.cor} />
            <Text style={[styles.tituloFacto, { color: artigo.cor }]}>Facto Interessante</Text>
          </View>
          <Text style={styles.textoFacto}>{artigo.facto}</Text>
          <Text style={styles.fonteFacto}>{artigo.fonte}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF8" },
  cabecalho: { padding: 24, alignItems: "center", paddingBottom: 32 },
  botaoVoltar: { alignSelf: "flex-start", marginBottom: 12 },
  imagemGrande: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: CORES.textoEscuro,
    textAlign: "center",
  },
  corpo: { padding: 24 },
  texto: {
    fontSize: 15,
    color: CORES.textoEscuro,
    lineHeight: 24,
  },
  caixaFacto: {
    marginTop: 24,
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  linhaFactoTitulo: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  tituloFacto: { fontSize: 14, fontWeight: "700" },
  textoFacto: { fontSize: 14, color: CORES.textoEscuro, lineHeight: 20, marginBottom: 8 },
  fonteFacto: { fontSize: 11, color: "#9CA3AF", fontStyle: "italic" },
});