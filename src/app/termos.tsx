import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { CORES, FUNDO_GRADIENTE } from "../constants/cores";


const PONTOS = [
  {
    icon: "lock-closed-outline" as const,
    texto: "As tuas respostas são anónimas",
    cor: CORES.azul,
  },
  {
    icon: "chatbubbles-outline" as const,
    texto: "Não substituímos um profissional de saúde",
    cor: CORES.verde,
  },
  {
    icon: "checkmark-circle-outline" as const,
    texto: "Podes parar quando quiseres",
    cor: CORES.coral,
  },
];

export default function Termos() {
  const router = useRouter();

  return (
    <LinearGradient colors={FUNDO_GRADIENTE} style={styles.gradiente}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Antes de começares</Text>

          {PONTOS.map((ponto, i) => (
            <View key={i} style={styles.linha}>
              <View style={[styles.iconeCirculo, { backgroundColor: ponto.cor + "22" }]}>
                <Ionicons name={ponto.icon} size={24} color={ponto.cor} />
              </View>
              <Text style={styles.textoLinha}>{ponto.texto}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.botao} onPress={() => router.push("/idade")}>
            <Text style={styles.textoBotao}>Concordo e quero continuar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradiente: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 24 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: CORES.textoEscuro,
    textAlign: "center",
    marginBottom: 28,
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconeCirculo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textoLinha: {
    flex: 1,
    fontSize: 15,
    color: CORES.textoEscuro,
    lineHeight: 21,
  },
  botao: {
    backgroundColor: CORES.azul,
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 12,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});