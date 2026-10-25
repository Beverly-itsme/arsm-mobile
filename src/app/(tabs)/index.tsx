import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CORES, FUNDO_GRADIENTE } from "../../constants/cores";
import CaraHumor, { CORES_HUMOR, NOMES_HUMOR } from "../../components/CaraHumor";
import TituloGradiente from "../../components/TituloGradiente";
import { obterHumores, guardarHumor, dataLocal } from "../../store/humorStore";

const INFO = [
  { icon: "time-outline" as const, texto: "3-5 min" },
  { icon: "list-outline" as const, texto: "16 perguntas" },
  { icon: "shield-checkmark-outline" as const, texto: "Anónimo" },
];

const ATALHOS = [
  { titulo: "Respirar", sub: "Acalma com calma", icon: "leaf-outline" as const, cor: CORES.verde, rota: "/respirar" },
  { titulo: "Diário", sub: "Escreve o que sentes", icon: "book-outline" as const, cor: CORES.lilas, rota: "/diario" },
  { titulo: "Humor", sub: "Ver o teu gráfico", icon: "stats-chart-outline" as const, cor: CORES.pessego, rota: "/humor" },
  { titulo: "Aprender", sub: "Sobre saúde mental", icon: "bulb-outline" as const, cor: CORES.azul, rota: "/educacao" },
];

function saudacao() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 19) return "Boa tarde";
  return "Boa noite";
}

export default function Inicio() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [humorHoje, setHumorHoje] = useState<number | null>(null);
  const [seletorAberto, setSeletorAberto] = useState(false);

  useFocusEffect(
    useCallback(() => {
      obterHumores().then((lista) => {
        const hoje = lista.find((r) => r.data === dataLocal());
        setHumorHoje(hoje ? hoje.nivel : null);
      });
    }, [])
  );

  async function registar(nivel: number) {
    await guardarHumor(nivel);
    setHumorHoje(nivel);
    setSeletorAberto(false);
  }

  return (
    <View style={styles.pagina}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 110,
        }}
      >
        <View style={styles.cabecalho}>
          <View style={{ flex: 1 }}>
            <TituloGradiente style={styles.saudacao}>{saudacao()}</TituloGradiente>
            <Text style={styles.subSaudacao}>Como te sentes hoje?</Text>
          </View>

          <TouchableOpacity
            style={styles.cantoHumor}
            onPress={() => setSeletorAberto(true)}
            activeOpacity={0.8}
          >
            {humorHoje !== null ? (
              <CaraHumor nivel={humorHoje} size={52} />
            ) : (
              <View style={styles.cantoVazio}>
                <Ionicons name="add" size={26} color="#8190D2" />
              </View>
            )}
            <Text style={styles.legendaCanto}>
              {humorHoje !== null ? NOMES_HUMOR[humorHoje - 1] : "Registar"}
            </Text>
          </TouchableOpacity>
        </View>

        <LinearGradient colors={FUNDO_GRADIENTE} style={styles.cartaoRastreio}>
          <Text style={styles.etiqueta}>RASTREIO</Text>
          <Text style={styles.tituloRastreio}>Rastreio de saúde mental</Text>
          <Text style={styles.textoRastreio}>
            Um momento tranquilo para perceberes como tens estado em relação
            à depressão e à ansiedade, de forma simples e privada.
          </Text>

          <View style={styles.chips}>
            {INFO.map((item, i) => (
              <View key={i} style={styles.chip}>
                <Ionicons name={item.icon} size={14} color="#FFFFFF" />
                <Text style={styles.textoChip}>{item.texto}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.botaoRastreio} onPress={() => router.push("/phq9")}>
            <Text style={styles.textoBotaoRastreio}>INICIAR AVALIAÇÃO</Text>
            <Ionicons name="arrow-forward" size={18} color="#5B4B9A" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.grelha}>
          {ATALHOS.map((a) => (
            <TouchableOpacity
              key={a.titulo}
              style={styles.atalho}
              onPress={() => router.push(a.rota as any)}
            >
              <View style={[styles.iconeAtalho, { backgroundColor: a.cor + "35" }]}>
                <Ionicons name={a.icon} size={22} color={CORES.textoEscuro} />
              </View>
              <Text style={styles.tituloAtalho}>{a.titulo}</Text>
              <Text style={styles.subAtalho}>{a.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.cartaoAjuda} onPress={() => router.push("/apoio")}>
          <Ionicons name="help-buoy-outline" size={24} color="#5B4B9A" />
          <View style={{ flex: 1 }}>
            <Text style={styles.tituloAjuda}>Precisas de ajuda agora?</Text>
            <Text style={styles.textoAjuda}>Vê com quem podes falar</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </ScrollView>

      <View pointerEvents="none" style={[styles.capaTopo, { height: insets.top }]} />

      <Modal
        visible={seletorAberto}
        transparent
        animationType="fade"
        onRequestClose={() => setSeletorAberto(false)}
      >
        <TouchableOpacity
          style={styles.fundoModal}
          activeOpacity={1}
          onPress={() => setSeletorAberto(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.cartaoModal}>
            <Text style={styles.tituloModal}>Como te sentes hoje?</Text>
            <Text style={styles.subModal}>Escolhe a cara que mais se parece contigo.</Text>

            <View style={styles.linhaCaras}>
              {[1, 2, 3, 4, 5].map((n) => (
                <TouchableOpacity key={n} style={styles.opcaoCara} onPress={() => registar(n)}>
                  <View
                    style={[
                      styles.molduraCara,
                      humorHoje === n && { borderColor: CORES_HUMOR[n - 1] },
                    ]}
                  >
                    <CaraHumor nivel={n} size={42} ativa={humorHoje === null || humorHoje === n} />
                  </View>
                  <Text
                    numberOfLines={1}
                    style={[styles.rotuloCara, humorHoje === n && styles.rotuloCaraAtivo]}
                  >
                    {NOMES_HUMOR[n - 1]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => {
                setSeletorAberto(false);
                router.push("/humor");
              }}
              hitSlop={8}
            >
              <Text style={styles.linkHumor}>Ver registos e gráfico</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pagina: { flex: 1, backgroundColor: "#FAFAF8" },
  capaTopo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FAFAF8",
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  saudacao: { fontSize: 28, fontWeight: "bold", color: CORES.textoEscuro },
  subSaudacao: { fontSize: 14, color: "#6B7280", marginTop: 2 },

  cantoHumor: { alignItems: "center", width: 76 },
  cantoVazio: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#8190D2",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  legendaCanto: { fontSize: 11, color: "#6B7280", marginTop: 4, textAlign: "center" },

  cartaoRastreio: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
  },
  etiqueta: { fontSize: 11, letterSpacing: 2, color: "#FFFFFF", opacity: 0.85, fontWeight: "700" },
  tituloRastreio: { fontSize: 22, fontWeight: "bold", color: "#FFFFFF", marginTop: 6 },
  textoRastreio: { fontSize: 14, color: "#FFFFFF", lineHeight: 21, marginTop: 8 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 16 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.22)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  textoChip: { fontSize: 12, color: "#FFFFFF", fontWeight: "600" },
  botaoRastreio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 28,
    marginTop: 20,
  },
  textoBotaoRastreio: { color: "#5B4B9A", fontSize: 13, fontWeight: "700", letterSpacing: 1.5 },

  grelha: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  atalho: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 16,
    marginBottom: 12,
  },
  iconeAtalho: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  tituloAtalho: { fontSize: 15, fontWeight: "700", color: CORES.textoEscuro },
  subAtalho: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  cartaoAjuda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 4,
    backgroundColor: CORES.lilas + "25",
    borderRadius: 18,
    padding: 16,
  },
  tituloAjuda: { fontSize: 15, fontWeight: "700", color: CORES.textoEscuro },
  textoAjuda: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  fundoModal: {
    flex: 1,
    backgroundColor: "rgba(58,69,96,0.45)",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  cartaoModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: "700",
    color: CORES.textoEscuro,
    textAlign: "center",
  },
  subModal: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 18,
  },
  linhaCaras: { flexDirection: "row", justifyContent: "space-between" },
  opcaoCara: { flex: 1, alignItems: "center" },
  molduraCara: {
    padding: 3,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "transparent",
  },
  rotuloCara: { fontSize: 10, color: "#6B7280", marginTop: 5, textAlign: "center" },
  rotuloCaraAtivo: { color: CORES.textoEscuro, fontWeight: "700" },
  linkHumor: {
    fontSize: 12,
    color: "#4A6FA5",
    fontWeight: "700",
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 18,
  },
});