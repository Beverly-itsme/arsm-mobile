import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE = "arsm_humor";

export type RegistoHumor = {
  data: string;
  nivel: number;
};

export function dataLocal(d: Date = new Date()): string {
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export async function obterHumores(): Promise<RegistoHumor[]> {
  try {
    const bruto = await AsyncStorage.getItem(CHAVE);
    return bruto ? JSON.parse(bruto) : [];
  } catch {
    return [];
  }
}

export async function guardarHumor(nivel: number): Promise<RegistoHumor[]> {
  const lista = await obterHumores();
  const hoje = dataLocal();
  const outras = lista.filter((r) => r.data !== hoje);
  const nova = [...outras, { data: hoje, nivel }]
    .sort((a, b) => a.data.localeCompare(b.data))
    .slice(-365);
  await AsyncStorage.setItem(CHAVE, JSON.stringify(nova));
  return nova;
}

export async function limparHumores(): Promise<void> {
  await AsyncStorage.removeItem(CHAVE);
}

// Só para testes: preenche 7 dias para veres o gráfico. Remover no fim.
export async function preencherDemo(): Promise<RegistoHumor[]> {
  const niveis = [2, 3, 2, 4, 3, 4, 5];
  const lista = niveis.map((nivel, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { data: dataLocal(d), nivel };
  });
  await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
  return lista;
}