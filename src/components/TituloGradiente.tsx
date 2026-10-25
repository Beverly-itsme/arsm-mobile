import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { FUNDO_GRADIENTE } from "../constants/cores";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export default function TituloGradiente({ children, style }: Props) {
  const plano = (StyleSheet.flatten(style) || {}) as TextStyle;
  const {
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    alignSelf,
    ...texto
  } = plano;

  const layout = {
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    alignSelf,
  };

  return (
    <MaskedView
      style={layout}
      maskElement={<Text style={[texto, { color: "#000000" }]}>{children}</Text>}
    >
      <LinearGradient colors={FUNDO_GRADIENTE} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={[texto, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}