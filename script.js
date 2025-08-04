// Quiz de Perguntas
// Lógica principal do jogo e gerenciamento da interface

class JogoMilionario {
    constructor() {
        // Estado do jogo
        this.indicePerguntaAtual = 0;
        this.pontuacao = 0;
        this.respostasCorretas = 0;
        this.perguntasJogo = [];
        this.respostaSelecionada = null;
        this.jogoFinalizado = false;

        // Estado do temporizador
        this.tempoRestante = 15;
        this.intervaloTemporizador = null;

        // Estado do sistema de ajuda
        this.ajudasUsadas = {
            cinquentaPorCinquenta: 0,
            pularPergunta: 0
        };

        this.limitesAjudas = {
            cinquentaPorCinquenta: 2,
            pularPergunta: 1
        };

        // Elementos do DOM
        this.inicializarElementos();

        // Listeners de eventos
        this.inicializarEventListeners();

        // Configurar jogo
        this.configurarJogo();
    }

    inicializarElementos() {
        // Telas
        this.telaBoasVindas = document.getElementById('tela-boas-vindas');
        this.telaJogo = document.getElementById('tela-jogo');
        this.telaResultados = document.getElementById('tela-resultados');

        // Elementos do jogo
        this.spanPerguntaAtual = document.getElementById('pergunta-atual');
        this.spanTotalPerguntas = document.getElementById('total-perguntas');
        this.spanPontuacao = document.getElementById('pontuacao');
        this.preenchimentoProgresso = document.getElementById('preenchimento-progresso');
        this.textoPergunta = document.getElementById('texto-pergunta');
        this.categoriaPergunta = document.getElementById('categoria-pergunta');
        this.exibirTemporizador = document.getElementById('exibir-temporizador');

        // Botões de resposta
        this.botoesResposta = document.querySelectorAll('.botao-resposta');
        this.textosResposta = {
            A: document.getElementById('resposta-a'),
            B: document.getElementById('resposta-b'),
            C: document.getElementById('resposta-c'),
            D: document.getElementById('resposta-d')
        };

        // Botões de ajuda
        this.botaoCinquentaPorCinquenta = document.getElementById('botao-50-50');
        this.botaoPularPergunta = document.getElementById('botao-pular-pergunta');
        this.contadorCinquentaPorCinquenta = document.getElementById('contador-50-50');
        this.contadorPular = document.getElementById('contador-pular');

        // Botões de controle
        this.botaoIniciarJogo = document.getElementById('botao-iniciar-jogo');
        this.botaoReiniciar = document.getElementById('botao-reiniciar');
        this.botaoFinalizarJogo = document.getElementById('botao-finalizar-jogo');
        this.botaoProximaPergunta = document.getElementById('botao-proxima-pergunta');
        this.botaoJogarNovamente = document.getElementById('botao-jogar-novamente');

        // Feedback
        this.secaoFeedback = document.getElementById('secao-feedback');
        this.mensagemFeedback = document.getElementById('mensagem-feedback');

        // Resultados
        this.pontuacaoFinal = document.getElementById('pontuacao-final');
        this.spanRespostasCorretas = document.getElementById('respostas-corretas');
        this.totalRespondidas = document.getElementById('total-respondidas');
        this.precisao = document.getElementById('precisao');
        this.mensagemDesempenho = document.getElementById('mensagem-desempenho');
    }

    inicializarEventListeners() {
        // Botões de início e controle
        this.botaoIniciarJogo.addEventListener('click', () => this.iniciarJogo());
        this.botaoReiniciar.addEventListener('click', () => this.reiniciarJogo());
        this.botaoFinalizarJogo.addEventListener('click', () => this.finalizarJogo());
        this.botaoProximaPergunta.addEventListener('click', () => this.proximaPergunta());
        this.botaoJogarNovamente.addEventListener('click', () => this.reiniciarJogo());

        // Botões de resposta
        this.botoesResposta.forEach(botao => {
            botao.addEventListener('click', (e) => this.selecionarResposta(e));
        });

        // Botões de ajuda
        this.botaoCinquentaPorCinquenta.addEventListener('click', () => this.usarCinquentaPorCinquenta());
        this.botaoPularPergunta.addEventListener('click', () => this.usarPularPergunta());
    }

    configurarJogo() {
        // Embaralhar perguntas e selecionar as primeiras 10
        this.perguntasJogo = this.embaralharArray([...PERGUNTAS]).slice(0, 10);
        this.spanTotalPerguntas.textContent = this.perguntasJogo.length;
        this.atualizarBotoesAjuda();
    }

    embaralharArray(array) {
        const embaralhado = [...array];
        for (let i = embaralhado.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [embaralhado[i], embaralhado[j]] = [embaralhado[j], embaralhado[i]];
        }
        return embaralhado;
    }

    iniciarJogo() {
        this.mostrarTela('jogo');
        this.carregarPergunta();
    }

    reiniciarJogo() {
        // Redefinir estado do jogo
        this.indicePerguntaAtual = 0;
        this.pontuacao = 0;
        this.respostasCorretas = 0;
        this.respostaSelecionada = null;
        this.jogoFinalizado = false;

        // Redefinir sistema de ajuda
        this.ajudasUsadas = {
            cinquentaPorCinquenta: 0,
            pularPergunta: 0
        };

        // Redefinir temporizador
        this.pararTemporizador();

        // Embaralhar perguntas novamente
        this.configurarJogo();

        // Ocultar feedback e mostrar jogo
        this.secaoFeedback.classList.add('oculta');
        this.mostrarTela('jogo');
        this.carregarPergunta();
    }

    finalizarJogo() {
        this.jogoFinalizado = true;
        this.mostrarResultados();
    }

    mostrarTela(nomeTela) {
        // Ocultar todas as telas
        document.querySelectorAll('.tela').forEach(tela => {
            tela.classList.remove('ativa');
        });

        // Mostrar tela selecionada
        switch (nomeTela) {
            case 'boas-vindas':
                this.telaBoasVindas.classList.add('ativa');
                this.pararTemporizador();
                break;
            case 'jogo':
                this.telaJogo.classList.add('ativa');
                break;
            case 'resultados':
                this.telaResultados.classList.add('ativa');
                this.pararTemporizador();
                break;
        }
    }

    carregarPergunta() {
        if (this.indicePerguntaAtual >= this.perguntasJogo.length) {
            this.finalizarJogo();
            return;
        }

        const pergunta = this.perguntasJogo[this.indicePerguntaAtual];

        // Atualizar exibição da pergunta
        this.textoPergunta.textContent = pergunta.pergunta;
        this.categoriaPergunta.textContent = pergunta.categoria;

        // Atualizar opções de resposta
        this.textosResposta.A.textContent = pergunta.opcoes.A;
        this.textosResposta.B.textContent = pergunta.opcoes.B;
        this.textosResposta.C.textContent = pergunta.opcoes.C;
        this.textosResposta.D.textContent = pergunta.opcoes.D;

        // Redefinir estados dos botões de resposta
        this.redefinirBotoesResposta();

        // Atualizar progresso
        this.atualizarProgresso();

        // Ocultar feedback
        this.secaoFeedback.classList.add('oculta');

        // Limpar resposta selecionada
        this.respostaSelecionada = null;

        // Iniciar temporizador
        this.iniciarTemporizador();
    }

    redefinirBotoesResposta() {
        this.botoesResposta.forEach(botao => {
            botao.classList.remove('selecionado', 'correto', 'incorreto', 'eliminado');
            botao.disabled = false;
        });
    }

    atualizarProgresso() {
        const percentualProgresso = ((this.indicePerguntaAtual + 1) / this.perguntasJogo.length) * 100;

        this.spanPerguntaAtual.textContent = this.indicePerguntaAtual + 1;
        this.spanPontuacao.textContent = this.pontuacao;
        this.preenchimentoProgresso.style.width = `${percentualProgresso}%`;
    }

    iniciarTemporizador() {
        this.tempoRestante = 15;
        this.atualizarExibirTemporizador();

        this.intervaloTemporizador = setInterval(() => {
            this.tempoRestante--;
            this.atualizarExibirTemporizador();

            if (this.tempoRestante <= 5) {
                this.exibirTemporizador.classList.add('aviso');
            }

            if (this.tempoRestante <= 0) {
                this.lidarComTempoEsgotado();
            }
        }, 1000);
    }

    pararTemporizador() {
        if (this.intervaloTemporizador) {
            clearInterval(this.intervaloTemporizador);
            this.intervaloTemporizador = null;
        }
        this.exibirTemporizador.classList.remove('aviso');
    }

    atualizarExibirTemporizador() {
        this.exibirTemporizador.textContent = `Tempo: ${this.tempoRestante}s`;
    }

    lidarComTempoEsgotado() {
        this.pararTemporizador();
        this.respostaSelecionada = 'tempoEsgotado';

        // Desabilitar todos os botões de resposta
        this.botoesResposta.forEach(botao => {
            botao.disabled = true;
        });

        // Processar tempo esgotado como resposta incorreta
        this.processarResposta();
    }

    selecionarResposta(evento) {
        if (this.respostaSelecionada || this.jogoFinalizado) return;

        const botaoSelecionado = evento.currentTarget;
        const resposta = botaoSelecionado.dataset.resposta;

        this.respostaSelecionada = resposta;
        botaoSelecionado.classList.add('selecionado');

        // Parar temporizador quando uma resposta é selecionada
        this.pararTemporizador();

        // Desabilitar todos os botões de resposta
        this.botoesResposta.forEach(botao => {
            botao.disabled = true;
        });

        // Processar resposta após um pequeno atraso para feedback visual
        setTimeout(() => {
            this.processarResposta();
        }, 500);
    }

    processarResposta() {
        const perguntaAtual = this.perguntasJogo[this.indicePerguntaAtual];
        const estaCorreto = this.respostaSelecionada === perguntaAtual.correta;
        const ehTempoEsgotado = this.respostaSelecionada === 'tempoEsgotado';

        // Mostrar estilo correto/incorreto
        this.botoesResposta.forEach(botao => {
            const resposta = botao.dataset.resposta;

            if (resposta === perguntaAtual.correta) {
                botao.classList.add('correto');
            } else if (resposta === this.respostaSelecionada && !estaCorreto && !ehTempoEsgotado) {
                botao.classList.add('incorreto');
            }
        });

        // Atualizar pontuação e estatísticas
        if (estaCorreto) {
            this.pontuacao += 100;
            this.respostasCorretas++;
            this.mostrarFeedback('Correto!', 'correto');
        } else if (ehTempoEsgotado) {
            this.mostrarFeedback('O tempo acabou! Você não respondeu a pergunta :(', 'incorreto');
        } else {
            this.mostrarFeedback(`Incorreto! A resposta correta era ${perguntaAtual.correta}: ${perguntaAtual.opcoes[perguntaAtual.correta]}`, 'incorreto');
        }

        // Atualizar exibição
        this.atualizarProgresso();
    }

    mostrarFeedback(mensagem, tipo) {
        this.mensagemFeedback.textContent = mensagem;
        this.mensagemFeedback.className = `mensagem-feedback ${tipo}`;
        this.secaoFeedback.classList.remove('oculta');
    }

    proximaPergunta() {
        this.indicePerguntaAtual++;

        if (this.indicePerguntaAtual >= this.perguntasJogo.length) {
            this.finalizarJogo();
        } else {
            this.carregarPergunta();
        }
    }

    usarCinquentaPorCinquenta() {
        if (this.ajudasUsadas.cinquentaPorCinquenta >= this.limitesAjudas.cinquentaPorCinquenta || this.respostaSelecionada) {
            return;
        }

        const perguntaAtual = this.perguntasJogo[this.indicePerguntaAtual];
        const respostaCorreta = perguntaAtual.correta;
        const respostasIncorretas = ['A', 'B', 'C', 'D'].filter(resposta => resposta !== respostaCorreta);

        // Selecionar aleatoriamente 2 respostas incorretas para eliminar
        const aEliminar = this.embaralharArray(respostasIncorretas).slice(0, 2);

        // Eliminar as respostas incorretas selecionadas
        this.botoesResposta.forEach(botao => {
            const resposta = botao.dataset.resposta;
            if (aEliminar.includes(resposta)) {
                botao.classList.add('eliminado');
                botao.disabled = true;
            }
        });

        this.ajudasUsadas.cinquentaPorCinquenta++;
        this.atualizarBotoesAjuda();
    }

    usarPularPergunta() {
        if (this.ajudasUsadas.pularPergunta >= this.limitesAjudas.pularPergunta || this.respostaSelecionada) {
            return;
        }

        this.ajudasUsadas.pularPergunta++;
        this.atualizarBotoesAjuda();
        this.pararTemporizador();

        // Pular para a próxima pergunta
        this.proximaPergunta();
    }

    atualizarBotoesAjuda() {
        // Atualizar botão 50:50
        const restanteCinquentaPorCinquenta = this.limitesAjudas.cinquentaPorCinquenta - this.ajudasUsadas.cinquentaPorCinquenta;
        this.contadorCinquentaPorCinquenta.textContent = restanteCinquentaPorCinquenta;
        this.botaoCinquentaPorCinquenta.disabled = restanteCinquentaPorCinquenta <= 0;

        // Atualizar botão de pular
        const restantePular = this.limitesAjudas.pularPergunta - this.ajudasUsadas.pularPergunta;
        this.contadorPular.textContent = restantePular;
        this.botaoPularPergunta.disabled = restantePular <= 0;
    }

    mostrarResultados() {
        const totalPerguntas = this.indicePerguntaAtual;
        const percentualPrecisao = totalPerguntas > 0 ? Math.round((this.respostasCorretas / totalPerguntas) * 100) : 0;

        // Atualizar exibição dos resultados
        this.pontuacaoFinal.textContent = this.pontuacao;
        this.spanRespostasCorretas.textContent = this.respostasCorretas;
        this.totalRespondidas.textContent = totalPerguntas;
        this.precisao.textContent = `${percentualPrecisao}%`;

        // Definir mensagem de desempenho usando switch para código mais limpo
        let mensagem = '';
        switch (true) {
            case (percentualPrecisao >= 90):
                mensagem = 'Parabéns! Você teve um resultado incrível! :D';
                break;
            case (percentualPrecisao >= 75):
                mensagem = 'Ótimo trabalho! Você realmente sabe das coisas! ;)';
                break;
            case (percentualPrecisao >= 60):
                mensagem = 'Bom trabalho! Você foi muito bem! :)';
                break;
            case (percentualPrecisao >= 40):
                mensagem = 'Nada mal! Continue estudando e você vai melhorar! :)';
                break;
            default:
                mensagem = 'Não foi um bom resultado. Tente novamente! :(';
                break;
        }

        this.mensagemDesempenho.textContent = mensagem;

        // Mostrar tela de resultados
        this.mostrarTela('resultados');
    }
}

// Inicializar jogo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new JogoMilionario();
});

// Impedir menu de contexto com clique direito para melhor experiência de jogo
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    // Impedir atualização com F5 durante o jogo
    if (e.key === 'F5') {
        e.preventDefault();
    }

    // Permitir seleção de resposta com teclado (A, B, C, D)
    if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
        const telaJogo = document.getElementById('tela-jogo');
        if (telaJogo.classList.contains('ativa')) {
            const botaoResposta = document.querySelector(`[data-resposta="${e.key.toUpperCase()}"]`);
            if (botaoResposta && !botaoResposta.disabled) {
                botaoResposta.click();
            }
        }
    }
});