import { useState, useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.100.4:5000";

const CORES_RISCO: Record<string, string> = {
  "mínimo": "#4CAF7D",
  "leve": "#8BC34A",
  "moderado": "#F5A623",
  "moderadamente severo": "#E8743B",
  "severo": "#D64545",
};

type Avaliacao = {
  id: number;
  data_hora: string;
  pontuacao_phq9: number;
  pontuacao_gad7: number;
  categoria_risco_phq9: string;
  categoria_risco_gad7: string;
};

export default function Historico() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [aCarregar, setACarregar] = useState(true);

  // useFocusEffect: recarrega sempre que a aba fica visível (ex: depois de um novo teste)
  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [])
  );

  async function carregarHistorico() {
    setACarregar(true);
    try {
      const uuid = await AsyncStorage.getItem("arsm_uuid");
      if (!uuid) {
        setAvaliacoes([]);
        return;
      }
      const resposta = await fetch(`${API_URL}/api/utilizador/${uuid}/historico`);
      const dados = await resposta.json();
      setAvaliacoes(dados.reverse()); // mais recente primeiro
    } catch (erro) {
      console.error(erro);
    } finally {
      setACarregar(false);
    }
  }

  function formatarData(dataISO: string) {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  if (aCarregar) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={{ marginTop: 40 }} color="#4A6FA5" />
      </SafeAreaView>
    );
  }

  if (avaliacoes.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.vazio}>
          <Text style={styles.tituloVazio}>Ainda sem avaliações</Text>
          <Text style={styles.textoVazio}>
            Quando fizeres a tua primeira avaliação, ela vai aparecer aqui.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>O teu histórico</Text>
      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Text style={styles.data}>{formatarData(item.data_hora)}</Text>
            <View style={styles.linha}>
              <View style={styles.metade}>
                <Text style={styles.rotulo}>Depressão</Text>
                <Text style={[styles.valor, { color: CORES_RISCO[item.categoria_risco_phq9] }]}>
                  {item.pontuacao_phq9}/27 · {item.categoria_risco_phq9}
                </Text>
              </View>
              <View style={styles.metade}>
                <Text style={styles.rotulo}>Ansiedade</Text>
                <Text style={[styles.valor, { color: CORES_RISCO[item.categoria_risco_gad7] }]}>
                  {item.pontuacao_gad7}/21 · {item.categoria_risco_gad7}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A2E",
    padding: 20,
    paddingBottom: 8,
  },
  lista: { padding: 20, paddingTop: 8 },
  cartao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  data: { fontSize: 13, color: "#9CA3AF", marginBottom: 8 },
  linha: { flexDirection: "row" },
  metade: { flex: 1 },
  rotulo: { fontSize: 13, color: "#6B7280", marginBottom: 2 },
  valor: { fontSize: 14, fontWeight: "600" },
  vazio: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  tituloVazio: { fontSize: 18, fontWeight: "600", color: "#1A1A2E", marginBottom: 8 },
  textoVazio: { fontSize: 14, color: "#6B7280", textAlign: "center" },
});