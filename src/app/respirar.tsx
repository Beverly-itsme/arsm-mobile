import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FUNDO_GRADIENTE } from "../constants/cores";

const INSPIRAR_MS = 4000;
const EXPIRAR_MS = 6000;
const DURACOES = [1, 2, 3];
const ZONA = 340;

type Fase = "inspira" | "expira";

export default function Respirar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const escala = useRef(new Animated.Value(1)).current;
  const ativoRef = useRef(false);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [minutos, setMinutos] = useState(1);
  const [ativo, setAtivo] = useState(false);
  const [terminou, setTerminou] = useState(false);
  const [fase, setFase] = useState<Fase>("inspira");
  const [restantes, setRestantes] = useState(60);

  function limpar() {
    ativoRef.current = false;
    escala.stopAnimation();
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  }

  useEffect(() => limpar, []);

  function ciclo() {
    if (!ativoRef.current) return;
    setFase("inspira");
    Animated.timing(escala, {
      toValue: 1.55,
      duration: INSPIRAR_MS,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished || !ativoRef.current) return;
      setFase("expira");
      Animated.timing(escala, {
        toValue: 1,
        duration: EXPIRAR_MS,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished: acabou }) => {
        if (acabou && ativoRef.current) ciclo();
      });
    });
  }

  function parar(concluido: boolean) {
    limpar();
    Animated.timing(escala, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setAtivo(false);
    setTerminou(concluido);
  }

  function comecar() {
    limpar();
    escala.setValue(1);
    setTerminou(false);
    setRestantes(minutos * 60);
    ativoRef.current = true;
    setAtivo(true);
    ciclo();

    const fim = Date.now() + minutos * 60000;
    intervaloRef.current = setInterval(() => {
      const segundos = Math.max(0, Math.ceil((fim - Date.now()) / 1000));
      setRestantes(segundos);
      if (segundos <= 0) parar(true);
    }, 500);
  }

  function sair() {
    limpar();
    router.replace("/(tabs)");
  }

  const m = Math.floor(restantes / 60);
  const s = restantes % 60;
  const tempo = `${m}:${String(s).padStart(2, "0")}`;

  const textoFase = ativo
    ? fase === "inspira"
      ? "Inspira"
      : "Expira"
    : terminou
    ? "Muito bem"
    : "Pronto?";

  return (
    <LinearGradient colors={FUNDO_GRADIENTE} style={styles.gradiente}>
      <ScrollView
        contentContainerStyle={[
          styles.conteudo,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
        ]}
      >
        <TouchableOpacity onPress={sair} style={styles.voltar} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Respirar</Text>
        <Text style={styles.subtitulo}>
          Inspira devagar pelo nariz durante 4 segundos e expira com calma
          durante 6. Acompanha o círculo.
        </Text>

        <View style={styles.zona}>
          <Animated.View style={[styles.anel, styles.anelExterior, { transform: [{ scale: escala }] }]} />
          <Animated.View style={[styles.anel, styles.anelMeio, { transform: [{ scale: escala }] }]} />
          <Animated.View style={[styles.nucleo, { transform: [{ scale: escala }] }]} />

          <View style={styles.textoCentro} pointerEvents="none">
            <Text style={styles.textoFase}>{textoFase}</Text>
            {ativo && <Text style={styles.textoTempo}>{tempo}</Text>}
          </View>
        </View>

        {!ativo && (
          <View style={styles.linhaDuracoes}>
            {DURACOES.map((d) => (
              <TouchableOpacity
                key={d}
                onPress={() => setMinutos(d)}
                style={[styles.chip, minutos === d && styles.chipAtivo]}
              >
                <Text style={[styles.textoChip, minutos === d && styles.textoChipAtivo]}>
                  {d} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {ativo ? (
          <TouchableOpacity style={styles.botaoParar} onPress={() => parar(false)}>
            <Text style={styles.textoBotaoParar}>Parar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.botao} onPress={comecar}>
            <Text style={styles.textoBotao}>{terminou ? "REPETIR" : "COMEÇAR"}</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.aviso}>
          Se te sentires tonto(a) ou desconfortável, pára e respira
          normalmente. Este exercício pode ajudar-te a acalmar, mas não
          substitui apoio profissional.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradiente: { flex: 1 },
  conteudo: { paddingHorizontal: 24, alignItems: "center" },
  voltar: { alignSelf: "flex-start", marginBottom: 8 },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF", textAlign: "center" },
  subtitulo: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 10,
    maxWidth: 300,
  },
  zona: { width: "100%", height: ZONA, marginVertical: 10 },
  anel: {
    position: "absolute",
    left: "50%",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.55)",
  },
  anelExterior: {
    width: 210,
    height: 210,
    borderRadius: 105,
    marginLeft: -105,
    top: (ZONA - 210) / 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  anelMeio: {
    width: 170,
    height: 170,
    borderRadius: 85,
    marginLeft: -85,
    top: (ZONA - 170) / 2,
  },
  nucleo: {
    position: "absolute",
    left: "50%",
    width: 130,
    height: 130,
    borderRadius: 65,
    marginLeft: -65,
    top: (ZONA - 130) / 2,
    backgroundColor: "rgba(255,255,255,0.88)",
  },
  textoCentro: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  textoFase: { fontSize: 22, fontWeight: "700", color: "#5B4B9A" },
  textoTempo: { fontSize: 14, color: "#5B4B9A", marginTop: 2 },
  linhaDuracoes: { flexDirection: "row", gap: 10, marginBottom: 18 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  chipAtivo: { backgroundColor: "#FFFFFF" },
  textoChip: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  textoChipAtivo: { color: "#5B4B9A" },
  botao: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 64,
    borderRadius: 28,
  },
  textoBotao: { color: "#5B4B9A", fontSize: 14, fontWeight: "700", letterSpacing: 1.5 },
  botaoParar: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    paddingVertical: 13,
    paddingHorizontal: 64,
    borderRadius: 28,
  },
  textoBotaoParar: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", letterSpacing: 1.5 },
  aviso: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 22,
    maxWidth: 300,
    opacity: 0.9,
  },
});