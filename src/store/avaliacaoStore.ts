// Guarda temporariamente as respostas enquanto o utilizador navega entre ecrãs
let respostasPHQ9: number[] = [];
let respostasGAD7: number[] = [];

export function guardarRespostasPHQ9(respostas: number[]) {
  respostasPHQ9 = respostas;
}

export function obterRespostasPHQ9(): number[] {
  return respostasPHQ9;
}

export function guardarRespostasGAD7(respostas: number[]) {
  respostasGAD7 = respostas;
}

export function obterRespostasGAD7(): number[] {
  return respostasGAD7;
}