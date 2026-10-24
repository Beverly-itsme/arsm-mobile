import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CORES } from "../constants/cores";
import CaraHumor, { CORES_HUMOR, NOMES_HUMOR } from "../components/CaraHumor";
import {
  RegistoHumor,
  dataLocal,
  obterHumores,
  guardarHumor,
  limparHumores,
  preencherDemo,
} from "../store/humorStore";

const ALTURA_GRAFICO = 110;
const LETRAS = ["D", "S", "T", "Q", "Q", "S", "S"];
const DIAS_SEMANA = [
  "domingo", "segunda-feira", "terça-feira", "quarta-feira",
  "quinta-feira", "sexta-feira", "sábado",
];
const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

export default function Humor() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [registos, setRegistos] = useState<RegistoHumor[]>([]);
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    obterHumores().then((lista) => {
      setRegistos(lista);
      const hoje = lista.find((r) => r.data === dataLocal());
      if (hoje) setSelecionado(hoje.nivel);
    });
  }, []);

  const agora = new Date();
  const textoBruto = `${DIAS_SEMANA[agora.getDay()]}, ${agora.getDate()} de ${MESES[agora.getMonth()]}`;
  const dataTexto = textoBruto.charAt(0).toUpperCase() + textoBruto.slice(1);
  const jaRegistouHoje = registos.some((r) => r.data === dataLocal());

  const dias = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const data = dataLocal(d);
    const reg = registos.find((r) => r.data === data);
    return {
      data,
      letra: LETRAS[d.getDay()],
      nivel: reg ? reg.nivel : null,
      eHoje: i === 6,
    };
  });

  const valores = dias.filter((d) => d.nivel !== null).map((d) => d.nivel as number);
  const media =
    valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : null;

  const ultimos = registos.slice(-3);
  const diasDificeis = ultimos.length === 3 && ultimos.every((r) => r.nivel <= 2);

  async function guardar() {
    if (selecionado === null) return;
    const lista = await guardarHumor(selecionado);
    setRegistos(lista);
    setMensagem("Registo guardado. Obrigado por parares um momento para ti.");
  }

  function apagar() {
    Alert.alert(
      "Apagar registos?",
      "Todos os teus registos de humor serão apagados deste telemóvel.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            await limparHumores();
            setRegistos([]);
            setSelecionado(null);
            setMensagem("");
          },
        },
      ]
    );
  }

  async function demo() {
    const lista = await preencherDemo();
    setRegistos(lista);
    setSelecionado(lista[lista.length - 1].nivel);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.conteudo,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 32 },
      ]}
    >
      <TouchableOpacity onPress={() => router.replace("/(tabs)")} style={styles.voltar} hitSlop={12}>
        <Ionicons name="arrow-back" size={24} color={CORES.textoEscuro} />
      </TouchableOpacity>

      <Text style={styles.titulo} onLongPress={demo}>
        Como te sentes hoje?
      </Text>
      <Text style={styles.data}>{dataTexto}</Text>

      <View style={styles.linhaCaras}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity
            key={n}
            style={styles.opcaoCara}
            onPress={() => {
              setSelecionado(n);
              setMensagem("");
            }}
          >
            <View
              style={[
                styles.molduraCara,
                selecionado === n && { borderColor: CORES_HUMOR[n - 1] },
              ]}
            >
              <CaraHumor nivel={n} size={46} ativa={selecionado === null || selecionado === n} />
            </View>
            <Text style={[styles.rotuloCara, selecionado === n && styles.rotuloCaraAtivo]}>
              {NOMES_HUMOR[n - 1]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.botao, selecionado === null && styles.botaoDesativado]}
        onPress={guardar}
        disabled={selecionado === null}
      >
        <Text style={styles.textoBotao}>
          {jaRegistouHoje ? "ATUALIZAR REGISTO" : "GUARDAR"}
        </Text>
      </TouchableOpacity>

      {mensagem !== "" && <Text style={styles.mensagem}>{mensagem}</Text>}

      {diasDificeis && (
        <View style={styles.cartaoApoio}>
          <Text style={styles.tituloApoio}>Tens tido dias mais difíceis</Text>
          <Text style={styles.textoApoio}>
            Isso acontece, e não tens de passar por isto sozinho(a). Falar com
            alguém de confiança pode ajudar.
          </Text>
          <TouchableOpacity style={styles.botaoApoio} onPress={() => router.push("/apoio")}>
            <Text style={styles.textoBotaoApoio}>Ver onde pedir apoio</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.cartaoGrafico}>
        <Text style={styles.tituloGrafico}>Últimos 7 dias</Text>

        <View style={styles.grafico}>
          {dias.map((d) => (
            <View key={d.data} style={styles.coluna}>
              <View style={styles.zonaBarra}>
                {d.nivel !== null ? (
                  <View
                    style={[
                      styles.barra,
                      {
                        height: (d.nivel / 5) * ALTURA_GRAFICO,
                        backgroundColor: CORES_HUMOR[d.nivel - 1],
                      },
                    ]}
                  />
                ) : (
                  <View style={styles.pontoVazio} />
                )}
              </View>
              <Text style={[styles.letra, d.eHoje && styles.letraHoje]}>{d.letra}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.legenda}>Cada barra é um dia. Mais alta significa um dia melhor.</Text>

        {media !== null ? (
          <Text style={styles.media}>
            Média: {media.toFixed(1).replace(".", ",")} de 5 · {valores.length}{" "}
            {valores.length === 1 ? "registo" : "registos"}
          </Text>
        ) : (
          <Text style={styles.media}>Ainda não tens registos nos últimos 7 dias.</Text>
        )}
      </View>

      <Text style={styles.privacidade}>
        Os teus registos ficam guardados só neste telemóvel.
      </Text>
      <TouchableOpacity onPress={apagar}>
        <Text style={styles.apagar}>Apagar os meus registos de humor</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF8" },
  conteudo: { paddingHorizontal: 20 },
  voltar: { alignSelf: "flex-start", marginBottom: 8 },
  titulo: { fontSize: 26, fontWeight: "bold", color: CORES.textoEscuro },
  data: { fontSize: 14, color: "#6B7280", marginTop: 4, marginBottom: 24 },
  linhaCaras: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  opcaoCara: { flex: 1, alignItems: "center" },
  molduraCara: {
    padding: 3,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "transparent",
  },
  rotuloCara: { fontSize: 10, color: "#6B7280", marginTop: 6, textAlign: "center" },
  rotuloCaraAtivo: { color: CORES.textoEscuro, fontWeight: "700" },
  botao: {
    backgroundColor: "#4A6FA5",
    paddingVertical: 15,
    borderRadius: 28,
    alignItems: "center",
  },
  botaoDesativado: { backgroundColor: "#C4CCD6" },
  textoBotao: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", letterSpacing: 1.5 },
  mensagem: {
    fontSize: 13,
    color: "#4CAF7D",
    textAlign: "center",
    marginTop: 12,
    fontWeight: "600",
  },
  cartaoApoio: {
    backgroundColor: CORES.lilas + "25",
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
  },
  tituloApoio: { fontSize: 15, fontWeight: "700", color: CORES.textoEscuro, marginBottom: 6 },
  textoApoio: { fontSize: 13, color: CORES.textoEscuro, lineHeight: 19 },
  botaoApoio: {
    alignSelf: "flex-start",
    backgroundColor: "#8190D2",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    marginTop: 12,
  },
  textoBotaoApoio: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  cartaoGrafico: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 18,
    marginTop: 24,
  },
  tituloGrafico: { fontSize: 15, fontWeight: "700", color: CORES.textoEscuro, marginBottom: 16 },
  grafico: { flexDirection: "row", justifyContent: "space-between" },
  coluna: { flex: 1, alignItems: "center" },
  zonaBarra: { height: ALTURA_GRAFICO, justifyContent: "flex-end", alignItems: "center" },
  barra: { width: 22, borderRadius: 11 },
  pontoVazio: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#E5E7EB" },
  letra: { fontSize: 12, color: "#9CA3AF", marginTop: 8 },
  letraHoje: { color: CORES.textoEscuro, fontWeight: "700" },
  legenda: { fontSize: 11, color: "#9CA3AF", marginTop: 14 },
  media: { fontSize: 13, color: CORES.textoEscuro, marginTop: 8, fontWeight: "600" },
  privacidade: { fontSize: 12, color: "#9CA3AF", textAlign: "center", marginTop: 22 },
  apagar: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 8,
    textDecorationLine: "underline",
  },
});