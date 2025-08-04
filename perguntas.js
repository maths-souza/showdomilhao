// Perguntas para o Quiz
const PERGUNTAS = [
    {
        id: 1,
        pergunta: "Qual é a capital do estado do Paraná?",
        opcoes: {
            A: "Porto Alegre",
            B: "Cuiabá",
            C: "Curitiba",
            D: "Natal"
        },
        correta: "C",
        categoria: "Geografia"
    },
    {
        id: 2,
        pergunta: "Em que ano a Seleção Brasileira conquistou sua primeira Copa do Mundo?",
        opcoes: {
            A: "1934",
            B: "1958",
            C: "1950",
            D: "1970"
        },
        correta: "B",
        categoria: "Esporte"
    },
    {
        id: 3,
        pergunta: "Qual foi o ano em que o Brasil foi descoberto?",
        opcoes: {
            A: "1510",
            B: "1492",
            C: "1500",
            D: "1600"
        },
        correta: "C",
        categoria: "História"
    },
    {
        id: 4,
        pergunta: "Qual destes biomas não existe em território brasileiro?",
        opcoes: {
            A: "Pampa",
            B: "Tundra",
            C: "Cerrado",
            D: "Pantanal"
        },
        correta: "B",
        categoria: "Geografia"
    },
    {
        id: 5,
        pergunta: "Em que ano o Brasil entrou na Segunda Guerra Mundial?",
        opcoes: {
            A: "1945",
            B: "1942",
            C: "1946",
            D: "1940"
        },
        correta: "B",
        categoria: "História"
    },
    {
        id: 6,
        pergunta: "Qual cidade brasileira foi sede dos Jogos Olímpicos de Verão de 2016?",
        opcoes: {
            A: "Brasília",
            B: "São Paulo",
            C: "Belo Horizonte",
            D: "Rio de Janeiro"
        },
        correta: "D",
        categoria: "Esporte"
    },
    {
        id: 7,
        pergunta: "Quem foi o primeiro presidente do Brasil?",
        opcoes: {
            A: "Manoel Deodoro da Fonseca",
            B: "Nilo Peçanha",
            C: "Getulio Vargas",
            D: "Floriano Peixoto"
        },
        correta: "A",
        categoria: "História"
    },
    {
        id: 8,
        pergunta: "Quem é o cantor brasileiro conhecido pelos shows especiais de Natal e Fim de ano?",
        opcoes: {
            A: "Milton Nascimento",
            B: "Roberto Carlos",
            C: "Gilberto Gil",
            D: "Caetano Veloso"
        },
        correta: "B",
        categoria: "Música"
    },
    {
        id: 9,
        pergunta: "Qual o país abaixo não faz fronteira com o Brasil?",
        opcoes: {
            A: "Venezuela",
            B: "Uruguai",
            C: "Equador",
            D: "Bolívia"
        },
        correta: "C",
        categoria: "Geografia"
    },
    {
        id: 10,
        pergunta: "Qual é a região do brasil com maior número de estados?",
        opcoes: {
            A: "Sul",
            B: "Sudeste",
            C: "Norte",
            D: "Nordeste"
        },
        correta: "D",
        categoria: "Geografia"
    },
];

// Exportar perguntas para uso no script principal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PERGUNTAS;
}