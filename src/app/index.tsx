import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CORES, FUNDO_GRADIENTE } from "../constants/cores";
import { FRASES } from "../constants/frases";
import Manchas from "../components/Manchas";

const CHAVE_ULTIMA_FRASE = "arsm_ultima_frase";

export default function BoasVindas() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [indice, setIndice] = useState<number | null>(null);

  useEffect(() => {
    let ativo = true;

    async function escolherFrase() {
      let ultimo = -1;
      try {
        const guardado = await AsyncStorage.getItem(CHAVE_ULTIMA_FRASE);
        if (guardado !== null) ultimo = parseInt(guardado, 10);
      } catch {}

      let novo = Math.floor(Math.random() * FRASES.length);
      if (FRASES.length > 1 && novo === ultimo) {
        novo = (novo + 1) % FRASES.length;
      }

      if (ativo) setIndice(novo);

      try {
        await AsyncStorage.setItem(CHAVE_ULTIMA_FRASE, String(novo));
      } catch {}
    }

    escolherFrase();
    return () => {
      ativo = false;
    };
  }, []);

  const frase = FRASES[indice ?? 0];
  const tamanhoTitulo = Math.min(48, Math.round(width * 0.105));

  return (
    <LinearGradient colors={FUNDO_GRADIENTE} style={styles.gradiente}>
      <Manchas />

      <View
        style={[
          styles.container,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
        ]}
      >
        <View style={styles.topo}>
  <Image source={require("../assets/arsm-logo-branco.png")} style={styles.logo} />
  <Image source={require("../assets/laco.webp")} style={styles.laco} />
   
</View>

        <View style={[styles.meio, { opacity: indice === null ? 0 : 1 }]}>
          <Text
            style={[
              styles.titulo,
              {
                fontSize: tamanhoTitulo,
                lineHeight: Math.round(tamanhoTitulo * 1.3),
                letterSpacing: Math.round(width * 0.008),
              },
            ]}
          >
            {frase.linhas.join("\n")}
          </Text>
          <Text style={styles.descricao}>{frase.descricao}</Text>
        </View>

        <TouchableOpacity
          style={styles.botao}
          activeOpacity={0.85}
          onPress={() => router.push("/termos")}
        >
          <Text style={styles.textoBotao}>COMEÇAR</Text>
          <View style={styles.setaCirculo}>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradiente: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24 },
  topo: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  logo: { width: 80, aspectRatio: 1.625, marginLeft: -10, marginTop: -8, resizeMode: "contain" },
  laco: { width: 30, height: 60, marginTop: -8, marginRight: -4, resizeMode: "contain" },
  meio: { flex: 1, justifyContent: "center" },
  titulo: {
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "Georgia", android: "serif", default: "serif" }),
  },
  descricao: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 18,
    maxWidth: 210,
  },
  botao: {
    alignSelf: "center",
    width: "68%",
    maxWidth: 300,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 28,
    paddingRight: 7,
  },
  textoBotao: {
    color: "#5B4B9A",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  setaCirculo: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: CORES.coral,
    justifyContent: "center",
    alignItems: "center",
  },
});