import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { CORES } from "../../constants/cores";
import { CONTACTOS } from "../../constants/contactos";
import TituloGradiente from "../../components/TituloGradiente";

const COM_QUEM_FALAR = [
  "Uma pessoa de confiança: família, amigo, colega, professor ou líder religioso.",
  "A unidade de saúde mais próxima: pergunta por apoio em saúde mental.",
  "Um profissional de saúde ou de psicologia, se tiveres acesso.",
];

const COMO_COMECAR = [
  "Tenho-me sentido mal ultimamente e gostava de falar contigo.",
  "Preciso de ajuda e não sei bem por onde começar.",
  "Podes ouvir-me? Não precisas de resolver nada, só ouvir.",
];

export default function Apoio() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.pagina}>
      <ScrollView
        contentContainerStyle={[
          styles.conteudo,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 110 },
        ]}
      >
        <TituloGradiente style={styles.titulo}>Se precisas de ajuda</TituloGradiente>

        <View style={styles.cartaoDestaque}>
          <Ionicons name="heart-outline" size={26} color="#FFFFFF" />
          <Text style={styles.textoDestaque}>
            Não há vergonha em pedir ajuda. Toda a gente precisa de apoio em
            algum momento, e pedir ajuda é um sinal de cuidado contigo.
          </Text>
        </View>

        <Text style={styles.secao}>Se estás em perigo agora</Text>
        <View style={styles.cartaoUrgente}>
          <Text style={styles.textoUrgente}>
            Se estás a pensar em fazer mal a ti mesmo(a), não fiques sozinho(a).
            Fala já com alguém que esteja perto de ti, ou dirige-te à unidade de
            saúde ou ao hospital mais próximo e diz que precisas de ajuda.
          </Text>
        </View>

        {CONTACTOS.length > 0 && (
          <>
            <Text style={styles.secao}>Contactos</Text>
            {CONTACTOS.map((c, i) => (
              <View key={i} style={styles.cartao}>
                <Text style={styles.nomeContacto}>{c.nome}</Text>
                <Text style={styles.descricaoContacto}>{c.descricao}</Text>
                {c.telefone ? (
                  <TouchableOpacity
                    style={styles.botaoLigar}
                    onPress={() => Linking.openURL(`tel:${c.telefone}`)}
                  >
                    <Ionicons name="call-outline" size={18} color="#FFFFFF" />
                    <Text style={styles.textoLigar}>Ligar {c.telefone}</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ))}
          </>
        )}

        <Text style={styles.secao}>Com quem falar</Text>
        <View style={styles.cartao}>
          {COM_QUEM_FALAR.map((texto, i) => (
            <View key={i} style={styles.linhaLista}>
              <View style={styles.bolinha} />
              <Text style={styles.textoLista}>{texto}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.secao}>Como começar a conversa</Text>
        {COMO_COMECAR.map((frase, i) => (
          <View key={i} style={styles.frase}>
            <Text style={styles.textoFrase}>"{frase}"</Text>
          </View>
        ))}

        <Text style={styles.aviso}>
          Esta aplicação não substitui um profissional de saúde nem um serviço
          de emergência.
        </Text>
      </ScrollView>

      <View pointerEvents="none" style={[styles.capaTopo, { height: insets.top }]} />
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
  conteudo: { paddingHorizontal: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", color: CORES.textoEscuro, marginBottom: 16 },
  cartaoDestaque: {
    backgroundColor: "#8190D2",
    borderRadius: 20,
    padding: 20,
    gap: 10,
    marginBottom: 8,
  },
  textoDestaque: { color: "#FFFFFF", fontSize: 15, lineHeight: 22 },
  secao: {
    fontSize: 16,
    fontWeight: "700",
    color: CORES.textoEscuro,
    marginTop: 22,
    marginBottom: 10,
  },
  cartaoUrgente: {
    backgroundColor: "#FDECEC",
    borderWidth: 1,
    borderColor: "#F2C4C4",
    borderRadius: 16,
    padding: 16,
  },
  textoUrgente: { color: "#3A3A3A", fontSize: 14, lineHeight: 21 },
  cartao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 10,
  },
  nomeContacto: { fontSize: 15, fontWeight: "700", color: CORES.textoEscuro },
  descricaoContacto: { fontSize: 13, color: "#6B7280", marginTop: 4, lineHeight: 19 },
  botaoLigar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#4A6FA5",
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 12,
  },
  textoLigar: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  linhaLista: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginVertical: 5 },
  bolinha: { width: 6, height: 6, borderRadius: 3, backgroundColor: CORES.azul, marginTop: 8 },
  textoLista: { flex: 1, fontSize: 14, color: CORES.textoEscuro, lineHeight: 21 },
  frase: {
    backgroundColor: CORES.lilas + "25",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },
  textoFrase: { fontSize: 14, color: CORES.textoEscuro, fontStyle: "italic", lineHeight: 20 },
  aviso: {
    fontSize: 12,
    color: "#9CA3AF",
    fontStyle: "italic",
    lineHeight: 17,
    marginTop: 20,
  },
});