import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CORES } from "../constants/cores";
import {
  Nota,
  obterNotas,
  guardarNota,
  apagarNota,
  limparNotas,
} from "../store/diarioStore";

const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

const SUGESTOES = [
  "Hoje senti-me...",
  "O que me preocupa é...",
  "Uma coisa boa de hoje foi...",
  "Neste momento preciso de...",
];

function formatarData(iso: string) {
  const d = new Date(iso);
  const hora = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${d.getDate()} de ${MESES[d.getMonth()]}, ${hora}`;
}

type Editor = { id?: string; texto: string; original: string };

export default function Diario() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notas, setNotas] = useState<Nota[]>([]);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    obterNotas().then(setNotas);
  }, []);

  function novaNota() {
    setEditor({ texto: "", original: "" });
  }

  function abrirNota(n: Nota) {
    setEditor({ id: n.id, texto: n.texto, original: n.texto });
  }

  function fecharEditor() {
    if (!editor) return;
    if (editor.texto.trim() !== editor.original.trim()) {
      Alert.alert("Sair sem guardar?", "O que escreveste ainda não foi guardado.", [
        { text: "Continuar a escrever", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: () => setEditor(null) },
      ]);
    } else {
      setEditor(null);
    }
  }

  async function guardar() {
    if (!editor || editor.texto.trim() === "") return;
    const lista = await guardarNota(editor.texto, editor.id);
    setNotas(lista);
    setEditor(null);
  }

  function apagar() {
    if (!editor || !editor.id) return;
    const id = editor.id;
    Alert.alert("Apagar nota?", "Esta nota será apagada deste telemóvel.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: async () => {
          setNotas(await apagarNota(id));
          setEditor(null);
        },
      },
    ]);
  }

  function apagarTudo() {
    Alert.alert(
      "Apagar todas as notas?",
      "Todas as notas do diário serão apagadas deste telemóvel.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar tudo",
          style: "destructive",
          onPress: async () => {
            await limparNotas();
            setNotas([]);
          },
        },
      ]
    );
  }

  function usarSugestao(s: string) {
    if (!editor) return;
    const texto = editor.texto.trim() === "" ? `${s} ` : `${editor.texto}\n\n${s} `;
    setEditor({ ...editor, texto });
  }

  if (editor) {
    const vazio = editor.texto.trim() === "";
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.conteudo,
            { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 },
          ]}
        >
          <View style={styles.barraEditor}>
            <TouchableOpacity onPress={fecharEditor} hitSlop={12}>
              <Ionicons name="close" size={26} color={CORES.textoEscuro} />
            </TouchableOpacity>
            {editor.id ? (
              <TouchableOpacity onPress={apagar} hitSlop={12}>
                <Ionicons name="trash-outline" size={22} color="#9CA3AF" />
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={styles.titulo}>{editor.id ? "Editar nota" : "Nova nota"}</Text>

          <TextInput
            multiline
            autoFocus
            value={editor.texto}
            onChangeText={(t) => setEditor({ ...editor, texto: t })}
            placeholder="Escreve aqui o que estás a sentir..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            textAlignVertical="top"
            maxLength={5000}
          />

          <Text style={styles.rotuloSugestoes}>Se não sabes por onde começar:</Text>
          <View style={styles.sugestoes}>
            {SUGESTOES.map((s) => (
              <TouchableOpacity key={s} style={styles.chip} onPress={() => usarSugestao(s)}>
                <Text style={styles.textoChip}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.cartaoSeguranca}>
            <Text style={styles.textoSeguranca}>
              Ninguém lê o que escreves aqui. Se estás a pensar em fazer mal a
              ti mesmo(a) ou em perigo, não fiques sozinho(a).
            </Text>
            <TouchableOpacity style={styles.botaoApoio} onPress={() => router.push("/apoio")}>
              <Text style={styles.textoBotaoApoio}>Ver onde pedir apoio</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.botao, vazio && styles.botaoDesativado]}
            onPress={guardar}
            disabled={vazio}
          >
            <Text style={styles.textoBotao}>GUARDAR</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.conteudo,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 32 },
        ]}
      >
        <TouchableOpacity onPress={() => router.replace("/(tabs)")} style={styles.voltar} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={CORES.textoEscuro} />
        </TouchableOpacity>

        <Text style={styles.titulo}>Diário</Text>
        <Text style={styles.subtitulo}>
          Um espaço só teu para escreveres o que estás a sentir. Podes escrever
          pouco ou muito, e não há certo nem errado.
        </Text>

        <View style={styles.cartaoPrivacidade}>
          <Ionicons name="lock-closed-outline" size={18} color="#5B4B9A" />
          <Text style={styles.textoPrivacidade}>
            As notas ficam guardadas só neste telemóvel e não são enviadas para
            lado nenhum. Se desinstalares a aplicação, perdes as notas.
          </Text>
        </View>

        <TouchableOpacity style={styles.botao} onPress={novaNota}>
          <Text style={styles.textoBotao}>NOVA NOTA</Text>
        </TouchableOpacity>

        {notas.length === 0 ? (
          <View style={styles.vazio}>
            <Ionicons name="book-outline" size={36} color={CORES.azul} />
            <Text style={styles.tituloVazio}>Ainda não escreveste nada</Text>
            <Text style={styles.textoVazio}>
              Quando escreveres a tua primeira nota, ela aparece aqui.
            </Text>
          </View>
        ) : (
          <>
            {notas.map((n) => (
              <TouchableOpacity key={n.id} style={styles.cartaoNota} onPress={() => abrirNota(n)}>
                <Text style={styles.dataNota}>{formatarData(n.criadoEm)}</Text>
                <Text style={styles.textoNota} numberOfLines={3}>
                  {n.texto}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={apagarTudo}>
              <Text style={styles.apagarTudo}>Apagar todas as notas</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAF8" },
  conteudo: { paddingHorizontal: 20 },
  voltar: { alignSelf: "flex-start", marginBottom: 8 },
  barraEditor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titulo: { fontSize: 26, fontWeight: "bold", color: CORES.textoEscuro },
  subtitulo: { fontSize: 14, color: "#6B7280", lineHeight: 20, marginTop: 6, marginBottom: 16 },
  cartaoPrivacidade: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: CORES.lilas + "25",
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  textoPrivacidade: { flex: 1, fontSize: 12, color: CORES.textoEscuro, lineHeight: 18 },
  botao: {
    backgroundColor: "#4A6FA5",
    paddingVertical: 15,
    borderRadius: 28,
    alignItems: "center",
  },
  botaoDesativado: { backgroundColor: "#C4CCD6" },
  textoBotao: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", letterSpacing: 1.5 },
  vazio: { alignItems: "center", marginTop: 40, paddingHorizontal: 20 },
  tituloVazio: { fontSize: 16, fontWeight: "700", color: CORES.textoEscuro, marginTop: 12 },
  textoVazio: { fontSize: 13, color: "#6B7280", textAlign: "center", marginTop: 6 },
  cartaoNota: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 16,
    marginTop: 12,
  },
  dataNota: { fontSize: 12, color: "#9CA3AF", marginBottom: 6 },
  textoNota: { fontSize: 14, color: CORES.textoEscuro, lineHeight: 20 },
  apagarTudo: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 22,
    textDecorationLine: "underline",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    minHeight: 220,
    fontSize: 15,
    lineHeight: 22,
    color: CORES.textoEscuro,
    marginTop: 12,
  },
  rotuloSugestoes: { fontSize: 12, color: "#6B7280", marginTop: 16, marginBottom: 8 },
  sugestoes: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1.5,
    borderColor: CORES.azul,
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  textoChip: { fontSize: 12, color: "#4A6FA5", fontWeight: "600" },
  cartaoSeguranca: {
    backgroundColor: "#FDECEC",
    borderRadius: 14,
    padding: 14,
    marginTop: 20,
    marginBottom: 20,
  },
  textoSeguranca: { fontSize: 12, color: "#3A3A3A", lineHeight: 18 },
  botaoApoio: {
    alignSelf: "flex-start",
    backgroundColor: "#8190D2",
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
  },
  textoBotaoApoio: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
});