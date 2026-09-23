import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Educacao() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        

        <Text style={styles.titulo}>Saúde Mental: o que precisas de saber</Text>

        <Text style={styles.secaoTitulo}>O que é depressão?</Text>
        <Text style={styles.texto}>
          A depressão é uma condição comum caracterizada por tristeza
          persistente ou perda de interesse em atividades que antes
          davam prazer, durante um período prolongado. Não é o mesmo que
          estar simplesmente triste por um dia — é algo que afeta o
          dia a dia de forma contínua.
        </Text>

        <Text style={styles.secaoTitulo}>O que é ansiedade?</Text>
        <Text style={styles.texto}>
          A ansiedade envolve sentimentos intensos e persistentes de
          preocupação ou medo, muitas vezes acompanhados de sintomas
          físicos como tensão muscular ou dificuldade em relaxar. Uma
          certa ansiedade é normal — torna-se preocupante quando é
          excessiva e difícil de controlar.
        </Text>

        <Text style={styles.secaoTitulo}>Sinais a que prestar atenção</Text>
        <Text style={styles.texto}>
          • Mudanças no sono ou apetite{"\n"}
          • Perda de interesse em coisas que antes gostavas{"\n"}
          • Dificuldade em concentrar-te{"\n"}
          • Sentir-te cansado(a) sem razão aparente{"\n"}
          • Preocupação que não consegues controlar{"\n"}
          • Isolamento de amigos e família
        </Text>

        <Text style={styles.secaoTitulo}>Mitos vs. Factos</Text>
        <Text style={styles.texto}>
          <Text style={styles.negrito}>Mito:</Text> "Depressão é só
          fraqueza, basta ter força de vontade."{"\n"}
          <Text style={styles.negrito}>Facto:</Text> A depressão é uma
          condição real, tal como qualquer outro problema de saúde, e
          não uma questão de fraqueza pessoal.
          {"\n\n"}
          <Text style={styles.negrito}>Mito:</Text> "Só se procura ajuda
          quando a situação é muito grave."{"\n"}
          <Text style={styles.negrito}>Facto:</Text> Procurar apoio
          precocemente pode prevenir que os sintomas se agravem.
        </Text>

        <Text style={styles.secaoTitulo}>O que podes fazer</Text>
        <Text style={styles.texto}>
          • Fala com alguém em quem confies{"\n"}
          • Mantém rotinas de sono e alimentação{"\n"}
          • Procura apoio profissional se os sintomas persistirem{"\n"}
          • Não hesites em fazer esta autoavaliação sempre que sentires necessidade
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  conteudo: { padding: 24, paddingBottom: 48 },
  linkVoltar: { marginBottom: 16 },
  textoLinkVoltar: { color: "#4A6FA5", fontSize: 16 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A2E",
    marginBottom: 24,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A2E",
    marginTop: 20,
    marginBottom: 10,
  },
  texto: {
    fontSize: 15,
    color: "#3A3A3A",
    lineHeight: 23,
  },
  negrito: {
    fontWeight: "700",
    color: "#1A1A2E",
  },
});