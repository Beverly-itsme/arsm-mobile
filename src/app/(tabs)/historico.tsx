import { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CORES } from "../../constants/cores";

const API_URL = "http://192.168.100.4:5000";

const CORES_RISCO: Record<string, string> = {
  "mínimo": "#4CAF7D",
  "leve": "#8BC34A",
  "moderado": CORES.coral,
  "moderadamente severo": "#E8743B",
  "severo": "#D64545",
};

const NIVEL_RISCO: Record<string, number> = {
  "mínimo": 0,
  "leve": 1,
  "moderado": 2,
  "moderadamente severo": 3,
  "severo": 4,
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
  const insets = useSafeAreaInsets();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [aCarregar, setACarregar] = useState(true);

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
      setAvaliacoes(dados.reverse());
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
      <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
        <ActivityIndicator style={{ marginTop: 40 }} color={CORES.azul} />
      </View>
    );
  }

  if (avaliacoes.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.titulo}>O teu histórico</Text>
        <View style={styles.vazio}>
          <View style={styles.iconeVazio}>
            <Ionicons name="time-outline" size={36} color={CORES.azul} />
          </View>
          <Text style={styles.tituloVazio}>Ainda sem avaliações</Text>
          <Text style={styles.textoVazio}>
            Quando fizeres a tua primeira avaliação, ela vai aparecer aqui.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.titulo}>O teu histórico</Text>
      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => {
          const corPHQ9 = CORES_RISCO[item.categoria_risco_phq9];
          const corGAD7 = CORES_RISCO[item.categoria_risco_gad7];
          const corPrincipal =
            NIVEL_RISCO[item.categoria_risco_phq9] >= NIVEL_RISCO[item.categoria_risco_gad7]
              ? corPHQ9
              : corGAD7;

          return (
            <View style={styles.cartao}>
              <Text style={styles.data}>{formatarData(item.data_hora)}</Text>

              <View style={styles.linhaResultado}>
                <Text style={styles.rotulo}>Depressão</Text>
                <View style={[styles.pilula, { backgroundColor: corPHQ9 + "20" }]}>
                  <View style={[styles.bolinha, { backgroundColor: corPHQ9 }]} />
                  <Text style={[styles.textoPilula, { color: corPHQ9 }]}>
                    {item.pontuacao_phq9}/27 · {item.categoria_risco_phq9}
                  </Text>
                </View>
              </View>

              <View style={styles.linhaResultado}>
                <Text style={styles.rotulo}>Ansiedade</Text>
                <View style={[styles.pilula, { backgroundColor: corGAD7 + "20" }]}>
                  <View style={[styles.bolinha, { backgroundColor: corGAD7 }]} />
                  <Text style={[styles.textoPilula, { color: corGAD7 }]}>
                    {item.pontuacao_gad7}/21 · {item.categoria_risco_gad7}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF8" },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: CORES.textoEscuro,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  lista: { paddingHorizontal: 20, paddingBottom: 20 },
  cartao: {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: "#EEEEEE",
},
  data: { fontSize: 12, color: "#9CA3AF", marginBottom: 12 },
  linhaResultado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  rotulo: { fontSize: 13, color: "#6B7280", fontWeight: "500" },
  pilula: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  bolinha: { width: 6, height: 6, borderRadius: 3 },
  textoPilula: { fontSize: 12, fontWeight: "700" },
  vazio: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  iconeVazio: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: CORES.azul + "15",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  tituloVazio: { fontSize: 17, fontWeight: "700", color: CORES.textoEscuro, marginBottom: 6 },
  textoVazio: { fontSize: 14, color: "#6B7280", textAlign: "center" },
});