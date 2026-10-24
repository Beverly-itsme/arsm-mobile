import Svg, { Circle, Path } from "react-native-svg";

export const CORES_HUMOR = ["#8190D2", "#6C9BCF", "#8FBC94", "#FFD59E", "#F2A490"];
export const NOMES_HUMOR = ["Muito mal", "Mal", "Assim-assim", "Bem", "Muito bem"];

const BOCAS = [
  "M7 17 Q12 11 17 17",
  "M8 16 Q12 13 16 16",
  "M8 15 H16",
  "M8 14 Q12 17 16 14",
  "M7 13 Q12 20 17 13",
];

type Props = {
  nivel: number;
  size?: number;
  ativa?: boolean;
};

export default function CaraHumor({ nivel, size = 56, ativa = true }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" opacity={ativa ? 1 : 0.5}>
      <Circle cx={12} cy={12} r={11} fill={CORES_HUMOR[nivel - 1]} />
      <Circle cx={9} cy={10} r={1.3} fill="#3A4560" />
      <Circle cx={15} cy={10} r={1.3} fill="#3A4560" />
      <Path
        d={BOCAS[nivel - 1]}
        stroke="#3A4560"
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}