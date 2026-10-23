import Svg, { Circle, Ellipse, Path } from "react-native-svg";
import { CORES } from "../constants/cores";

type Props = { size?: number };

export default function Mascote({ size = 160 }: Props) {
  return (
    <Svg width={size} height={size * 1.1} viewBox="0 0 200 220">
      <Ellipse cx="100" cy="175" rx="65" ry="45" fill={CORES.azul} />
      <Ellipse cx="45" cy="150" rx="16" ry="32" fill={CORES.azul} transform="rotate(-25 45 150)" />
      <Circle cx="30" cy="105" r="13" fill={CORES.pessego} />
      <Circle cx="100" cy="90" r="55" fill={CORES.pessego} />
      <Circle cx="80" cy="85" r="6" fill={CORES.textoEscuro} />
      <Circle cx="120" cy="85" r="6" fill={CORES.textoEscuro} />
      <Path
        d="M75 108 Q100 128 125 108"
        stroke={CORES.textoEscuro}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}