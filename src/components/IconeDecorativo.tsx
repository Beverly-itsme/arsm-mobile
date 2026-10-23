import Svg, { Path } from "react-native-svg";

type Tipo = "coracao" | "balao" | "ponto" | "laco";

type Props = {
  tipo: Tipo;
  size?: number;
  cor?: string;
  opacidade?: number;
};

export default function IconeDecorativo({ tipo, size = 28, cor = "#FFFFFF", opacidade = 0.55 }: Props) {
  if (tipo === "coracao") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" opacity={opacidade}>
        <Path
          d="M12 4.248C9.849 1.61 6.015 1.5 3.75 4.049c-2.5 2.798-1.86 6.729.834 9.198l6.774 6.264a1 1 0 0 0 1.284 0l6.774-6.264c2.694-2.469 3.334-6.4.834-9.198C17.985 1.5 14.151 1.61 12 4.248Z"
          fill={cor}
        />
      </Svg>
    );
  }

  if (tipo === "balao") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" opacity={opacidade}>
        <Path
          d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
          fill={cor}
        />
      </Svg>
    );
  }

  if (tipo === "laco") {
    return (
      <Svg width={size} height={size * 1.3} viewBox="0 0 24 30" opacity={opacidade}>
        <Path
          d="M12 3c-2.2 0-4 1.7-4 3.8S9.8 10.6 12 10.6s4-1.7 4-3.8S14.2 3 12 3z"
          fill={cor}
        />
        <Path d="M11 9L4.5 26l5-2.5 2-3.5L11 9z" fill={cor} />
        <Path d="M13 9l6.5 17-5-2.5-2-3.5L13 9z" fill={cor} />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" opacity={opacidade}>
      <Path
        d={`M${size / 2} 0a${size / 2} ${size / 2} 0 1 0 0.01 0z`}
        fill={cor}
      />
    </Svg>
  );
}