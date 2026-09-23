import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

export default function Teste() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.emoji}>📝</Text>
        <Text style={styles.titulo}>Pronto para começar?</Text>
        <Text style={styles.texto}>
          A avaliação tem 16 perguntas simples e demora cerca de 3 a 5
          minutos. As tuas respostas são sempre anónimas.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.push("/phq9")}
        >
          <Text style={styles.textoBotao}>Iniciar avaliação</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  conteudo: { flex: 1, padding: 24, justifyContent: "center", alignItems: "center" },
  emoji: { fontSize: 56, marginBottom: 16 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A2E",
    textAlign: "center",
    marginBottom: 12,
  },
  texto: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  botao: {
    backgroundColor: "#4A6FA5",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});