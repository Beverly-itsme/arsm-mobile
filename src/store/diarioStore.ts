import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE = "arsm_diario";

export type Nota = {
  id: string;
  criadoEm: string;
  atualizadoEm: string;
  texto: string;
};

function ordenar(lista: Nota[]): Nota[] {
  return [...lista].sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

async function gravar(lista: Nota[]) {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
}

export async function obterNotas(): Promise<Nota[]> {
  try {
    const bruto = await AsyncStorage.getItem(CHAVE);
    return bruto ? ordenar(JSON.parse(bruto)) : [];
  } catch {
    return [];
  }
}

export async function guardarNota(texto: string, id?: string): Promise<Nota[]> {
  const lista = await obterNotas();
  const agora = new Date().toISOString();
  const limpo = texto.trim().slice(0, 5000);

  let nova: Nota[];
  if (id) {
    nova = lista.map((n) =>
      n.id === id ? { ...n, texto: limpo, atualizadoEm: agora } : n
    );
  } else {
    const nota: Nota = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      criadoEm: agora,
      atualizadoEm: agora,
      texto: limpo,
    };
    nova = [nota, ...lista];
  }

  await gravar(nova);
  return ordenar(nova);
}

export async function apagarNota(id: string): Promise<Nota[]> {
  const lista = await obterNotas();
  const nova = lista.filter((n) => n.id !== id);
  await gravar(nova);
  return ordenar(nova);
}

export async function limparNotas(): Promise<void> {
  await AsyncStorage.removeItem(CHAVE);
}