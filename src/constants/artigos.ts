import { CORES } from "./cores";

export const ARTIGOS = [
  {
    id: "o-que-e-depressao",
    titulo: "O que é depressão?",
    imagem: require("../assets/educacao/depressao.png"),
    cor: CORES.azul,
    resumo: "Sintomas, causas e como reconhecer os sinais",
    conteudo: `A depressão é uma condição comum caracterizada por tristeza persistente ou perda de interesse em atividades que antes davam prazer, durante um período prolongado.

Não é o mesmo que estar simplesmente triste por um dia é algo que afeta o dia a dia de forma contínua, muitas vezes durante semanas ou meses.

Sinais comuns incluem: mudanças no sono ou apetite, cansaço persistente, dificuldade de concentração, sentimentos de culpa ou desesperança, e perda de interesse em atividades que antes eram prazerosas.

A depressão pode afetar qualquer pessoa, independentemente da idade, género ou situação de vida. Não é sinal de fraqueza, e existem formas eficazes de tratamento e apoio.`,
    facto:
      "Segundo a Organização Mundial da Saúde, mais de 280 milhões de pessoas no mundo vivem com depressão e mais de 75% delas, em países de baixo e médio rendimento, nunca chegam a receber tratamento.",
    fonte: "Fonte: Organização Mundial da Saúde (2023)",
  },
  {
    id: "o-que-e-ansiedade",
    titulo: "O que é ansiedade?",
    imagem: require("../assets/educacao/ansiedade.png"),
    cor: CORES.coral,
    resumo: "Perceber a diferença entre preocupação normal e ansiedade",
    conteudo: `A ansiedade envolve sentimentos intensos e persistentes de preocupação ou medo, muitas vezes acompanhados de sintomas físicos como tensão muscular, palpitações ou dificuldade em relaxar.

Uma certa ansiedade é normal todos sentimos nervosismo antes de algo importante. Torna-se preocupante quando é excessiva, difícil de controlar, e interfere no dia a dia.

Sinais comuns incluem: preocupação constante, irritabilidade, tensão muscular, dificuldade em dormir, e uma sensação persistente de perigo iminente, mesmo sem uma causa clara.

Existem vários tipos de ansiedade desde a preocupação generalizada até ataques de pânico mais intensos e pontuais. Todos são reais e merecem atenção.`,
    facto:
      "A ansiedade é o transtorno mental mais comum do mundo ainda mais comum do que a depressão. Estima-se que afete cerca de 359 milhões de pessoas globalmente.",
    fonte: "Fonte: Organização Mundial da Saúde (2023)",
  },
  {
    id: "mitos-ansiedade",
    titulo: "Mitos sobre ansiedade",
    imagem: require("../assets/educacao/mitos-ansiedade.png"),
    cor: CORES.lilas,
    resumo: "Separar o que é verdade do que é só senso comum",
    conteudo: `Mito: "Ansiedade é só nervosismo, todos passam por isso."
Facto: A ansiedade excessiva e persistente é diferente do nervosismo comum pode afetar seriamente a vida da pessoa, mesmo sem uma causa evidente.

Mito: "Basta relaxar e vai passar."
Facto: A ansiedade muitas vezes precisa de estratégias específicas ou apoio profissional, não só "relaxar" não é uma questão de escolha.

Mito: "Pessoas ansiosas são fracas."
Facto: A ansiedade não tem relação com força de vontade é uma resposta real do corpo e da mente, com base biológica.

Mito: "Ansiedade é só um problema mental, não físico."
Facto: A ansiedade causa sintomas físicos muito reais tensão muscular, dores de cabeça, problemas digestivos, palpitações.`,
    facto:
      "Um ataque de pânico pode causar sintomas tão intensos palpitações, falta de ar, dor no peito que muitas pessoas os confundem com um ataque cardíaco e vão às urgências. É assustador, mas não é perigoso para o coração.",
    fonte: "Facto clínico amplamente documentado na literatura sobre perturbações de pânico",
  },
  {
    id: "mitos-depressao",
    titulo: "Mitos sobre depressão",
    imagem: require("../assets/educacao/mitos-depressao.png"),
    cor: CORES.verde,
    resumo: "Separar o que é verdade do que é só senso comum",
    conteudo: `Mito: "Depressão é só fraqueza, basta ter força de vontade."
Facto: A depressão é uma condição real, tal como qualquer outro problema de saúde, e não uma questão de fraqueza pessoal.

Mito: "Só se procura ajuda quando a situação é muito grave."
Facto: Procurar apoio precocemente pode prevenir que os sintomas se agravem não é preciso esperar por uma crise.

Mito: "Quem tem depressão está sempre triste."
Facto: A depressão pode também mostrar-se como cansaço, irritabilidade, dores físicas, ou perda de interesse nem sempre "tristeza" visível.

Mito: "Depressão passa sozinha com o tempo."
Facto: Em alguns casos pode melhorar sozinha, mas frequentemente precisa de apoio ativo esperar sem ajuda pode prolongar o sofrimento.`,
    facto:
      "Nalgumas culturas, incluindo em contextos africanos, a depressão manifesta-se mais através de sintomas físicos como dores de cabeça, dores no corpo ou cansaço do que através de tristeza expressa abertamente.",
    fonte: "Padrão documentado na literatura sobre saúde mental em contextos africanos",
  },
  {
    id: "dicas-sono",
    titulo: "Sono e bem-estar",
    imagem: require("../assets/educacao/sono.png"),
    cor: CORES.pessego,
    resumo: "Como uma boa rotina de sono ajuda a saúde mental",
    conteudo: `O sono e a saúde mental estão profundamente ligados. Dormir mal pode agravar sintomas de ansiedade e depressão, e esses sintomas podem, por sua vez, dificultar o sono um ciclo que vale a pena quebrar.

Especialistas em medicina do sono recomendam entre 7 a 9 horas de sono por noite para adultos, para um funcionamento saudável do corpo e da mente.

Algumas dicas simples: mantém horários regulares para dormir e acordar (mesmo aos fins de semana), evita ecrãs pelo menos 30 minutos antes de dormir, evita cafeína à tarde/noite, e cria uma rotina calma antes de deitar.

Se tens dificuldade persistente em dormir, isso pode ser tanto causa como sintoma de ansiedade ou depressão vale a pena falares sobre isso com alguém de confiança ou um profissional.`,
    facto:
      "Estudos mostram que dormir menos de 7 horas por noite, de forma consistente, está associado a um risco significativamente maior de depressão o sono não é um luxo, é uma necessidade para a tua saúde mental.",
    fonte: "Fonte: American Academy of Sleep Medicine / Sleep Research Society (2015)",
  },
  {
    id: "quando-procurar-ajuda",
    titulo: "Quando procurar ajuda",
    imagem: require("../assets/educacao/ajuda.png"),
    cor: CORES.azul,
    resumo: "Sinais de que talvez seja altura de falar com alguém",
    conteudo: `Não existe um momento "certo" único para procurar ajuda mas alguns sinais sugerem que pode ser uma boa altura:

Os sintomas duram há mais de duas semanas, interferem no trabalho/estudos/relações, ou sentes que não consegues geri-los sozinho(a).

Também vale a pena procurar ajuda se notares mudanças significativas no sono, apetite ou energia, se te sentires isolado(a) das pessoas à tua volta, ou se tiveres pensamentos persistentes de desesperança.

Procurar ajuda não é sinal de fraqueza é um passo de cuidado contigo mesmo(a). Podes começar por falar com alguém de confiança, ou procurar um profissional de saúde.

Se em algum momento tiveres pensamentos de fazer mal a ti mesmo(a), procura ajuda imediatamente fala com alguém de confiança ou dirige-te a uma unidade de saúde.`,
    facto:
      "Estima-se que, em contextos como Moçambique, entre 76% e 85% das pessoas com transtornos mentais comuns nunca chegam a receber qualquer tipo de tratamento. Procurar ajuda é um passo corajoso e cada vez mais pessoas estão a dá-lo.",
    fonte: "Fonte: Muanido et al. (2023), estudo realizado na província de Sofala",
  },
];