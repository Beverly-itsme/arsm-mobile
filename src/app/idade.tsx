import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { CORES, FUNDO_GRADIENTE } from "../constants/cores";

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
      let uuid = await AsyncStorage.getItem("arsm_uuid");
      if (!uuid) {
        uuid = uuidv4();
        await AsyncStorage.setItem("arsm_uuid", uuid);
      }

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
    <LinearGradient colors={FUNDO_GRADIENTE} style={styles.gradiente}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    color: CORES.textoEscuro,
    textAlign: "center",
  },
  opcao: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  opcaoSelecionada: {
    borderColor: CORES.azul,
    backgroundColor: CORES.azul + "15",
  },
  textoOpcao: {
    fontSize: 16,
    color: CORES.textoEscuro,
    textAlign: "center",
  },
  textoOpcaoSelecionada: {
    color: CORES.azul,
    fontWeight: "700",
  },
  botao: {
    backgroundColor: CORES.azul,
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 16,
  },
  botaoDesativado: {
    backgroundColor: "#C4CCD6",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});