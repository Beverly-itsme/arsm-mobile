export type Contacto = {
  nome: string;
  descricao: string;
  telefone?: string;
};

// Só preenche depois de confirmares cada contacto numa fonte oficial
// ou ligando para testar. Com a lista vazia, a app mostra só orientações.
export const CONTACTOS: Contacto[] = [];