import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { CORES } from "../constants/cores";

const FORMA_A =
  "M-30,-40 C-6,-52 30,-48 44,-24 C56,-2 40,14 46,32 C50,52 22,58 4,52 C-18,46 -26,60 -42,48 C-60,34 -56,6 -52,-12 C-48,-28 -42,-34 -30,-40 Z";
const FORMA_B =
  "M-20,-50 C10,-60 44,-48 50,-18 C56,10 34,30 20,44 C8,56 -16,54 -30,40 C-44,26 -34,10 -46,-4 C-58,-18 -42,-42 -20,-50 Z";
const FORMA_C =
  "M-10,-48 C8,-44 14,-60 36,-50 C58,-40 56,-10 50,8 C44,28 54,46 30,54 C8,62 -10,48 -28,52 C-50,56 -58,30 -50,10 C-44,-4 -58,-14 -46,-30 C-38,-42 -24,-52 -10,-48 Z";

const ANEIS = [CORES.verde, "#A9CBF2", "#DCD3F5", "#FFFFFF"];
const PASSO_ANEL_PX = 6;

function transformar(d: string, cx: number, cy: number, escala: number, rotGraus: number) {
  const rad = (rotGraus * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return d.replace(
    /(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,
    (_: string, xs: string, ys: string) => {
      const x = parseFloat(xs) * escala;
      const y = parseFloat(ys) * escala;
      const rx = x * cos - y * sin + cx;
      const ry = x * sin + y * cos + cy;
      return `${rx.toFixed(1)},${ry.toFixed(1)}`;
    }
  );
}

type Props = {
  d: string;
  cx: number;
  cy: number;
  escala: number;
  rot: number;
  cor: string;
};

function Mancha({ d, cx, cy, escala, rot, cor }: Props) {
  const raio = 50 * escala;

  return (
    <>
      <Path d={transformar(d, cx, cy, escala, rot)} fill={cor} />
      {ANEIS.map((corAnel, i) => (
        <Path
          key={i}
          d={transformar(d, cx, cy, escala * (1 + ((i + 1) * PASSO_ANEL_PX) / raio), rot)}
          fill="none"
          stroke={corAnel}
          strokeWidth={1.6}
        />
      ))}
    </>
  );
}

export default function Manchas() {
  return (
    <View style={[StyleSheet.absoluteFill, { overflow: "hidden" }]} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 300 640" preserveAspectRatio="xMidYMid slice">
        <Mancha d={FORMA_A} cx={34} cy={118} escala={0.8} rot={-10} cor={CORES.coral} />
        <Mancha d={FORMA_B} cx={262} cy={140} escala={1} rot={15} cor={CORES.pessego} />
        <Mancha d={FORMA_C} cx={230} cy={346} escala={1.28} rot={-8} cor={CORES.coral} />
      </Svg>
    </View>
  );
}