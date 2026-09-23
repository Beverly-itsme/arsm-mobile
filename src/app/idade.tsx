import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const API_URL = "http://192.168.100.4:5000";

const FAIXAS = ["13-17", "18-24", "25-34", "35-44", "45+"];

export default function Idade() {
  const router = useRouter();
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [aCarregar, setACarregar] = useState(false);

  async function continuar() {
    if (!selecionada) return;
    setACarregar(true);

    try {
      // Verifica se já existe um UUID guardado neste telemóvel
      let uuid = await AsyncStorage.getItem("arsm_uuid");
      if (!uuid) {
        uuid = uuidv4();
        await AsyncStorage.setItem("arsm_uuid", uuid);
      }

      // Regista o utilizador no backend
      await fetch(`${API_URL}/api/utilizador`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid, faixa_etaria: selecionada }),
      });

      router.push("/(tabs)");
    } catch (erro) {
      alert("Não foi possível ligar ao servidor. Verifica a tua ligação.");
      console.error(erro);
    } finally {
      setACarregar(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Qual é a tua faixa etária?</Text>

        {FAIXAS.map((faixa) => (
          <TouchableOpacity
            key={faixa}
            style={[
              styles.opcao,
              selecionada === faixa && styles.opcaoSelecionada,
            ]}
            onPress={() => setSelecionada(faixa)}
          >
            <Text
              style={[
                styles.textoOpcao,
                selecionada === faixa && styles.textoOpcaoSelecionada,
              ]}
            >
              {faixa} anos
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.botao, !selecionada && styles.botaoDesativado]}
          onPress={continuar}
          disabled={!selecionada || aCarregar}
        >
          {aCarregar ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBotao}>Continuar</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  conteudo: { flex: 1, padding: 24, justifyContent: "center" },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#1A1A2E",
    textAlign: "center",
  },
  opcao: {
    borderWidth: 2,
    borderColor: "#D0D5DD",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  opcaoSelecionada: {
    borderColor: "#4A6FA5",
    backgroundColor: "#E8EEF7",
  },
  textoOpcao: {
    fontSize: 16,
    color: "#3A3A3A",
    textAlign: "center",
  },
  textoOpcaoSelecionada: {
    color: "#4A6FA5",
    fontWeight: "600",
  },
  botao: {
    backgroundColor: "#4A6FA5",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  botaoDesativado: {
    backgroundColor: "#B0B8C4",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});