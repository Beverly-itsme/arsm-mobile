import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

export default function Consentimento() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Bem-vindo(a) ao ARSM</Text>

        <Text style={styles.texto}>
          Esta aplicação ajuda-te a fazer uma autoavaliação de sinais de
          depressão e ansiedade, com base em questionários usados
          internacionalmente.
        </Text>

        <Text style={styles.texto}>
          Não pedimos o teu nome, número de telefone ou email. As tuas
          respostas são guardadas de forma anónima, apenas para fins de
          investigação académica.
        </Text>

        <Text style={styles.texto}>
          Esta aplicação não substitui uma avaliação feita por um
          profissional de saúde. É apenas uma ferramenta de rastreio.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.push("/idade")}
        >
          <Text style={styles.textoBotao}>Concordo e quero continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  conteudo: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1A1A2E",
    textAlign: "center",
  },
  texto: {
    fontSize: 16,
    lineHeight: 24,
    color: "#3A3A3A",
    marginBottom: 16,
  },
  botao: {
    backgroundColor: "#4A6FA5",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});
