(function() {
    console.log('🎮 Iniciando script para marcar jogos como completos...');
    
    // Função para gerar uma palavra aleatória para usar como resposta
    function generateRandomWord() {
        const words = ['casa', 'amor', 'vida', 'tempo', 'mundo', 'pessoa', 'dia', 'vez', 'lugar', 'trabalho'];
        return words[Math.floor(Math.random() * words.length)];
    }
    
    // Função para criar dados de jogo completo
    function createCompletedGame(gameId, word = null) {
        const chosenWord = word || generateRandomWord();
        return {
            gameId: gameId,
            guessHistory: [[chosenWord, 0]], // 0 = palavra correta
            lastGuess: [chosenWord, 0],
            foundWord: chosenWord,
            numberOfTips: 0,
            numberOfAttempts: 1,
            gaveUp: "",
            postGameHistory: []
        };
    }
    
    try {
        // Pega o estado atual do localStorage
        const currentState = localStorage.getItem('state');
        let state;
        
        if (currentState) {
            state = JSON.parse(currentState);
            console.log('📊 Estado atual encontrado');
        } else {
            // Cria um estado básico se não existir
            state = {
                lastGameId: 1301,
                openGameId: 1301,
                gameData: {
                    pt: {},
                    en: {},
                    es: {}
                },
                version: 2
            };
            console.log('📝 Criando novo estado');
        }
        
        // Garante que as estruturas existam
        if (!state.gameData) state.gameData = { pt: {}, en: {}, es: {} };
        if (!state.gameData.pt) state.gameData.pt = {};
        
        // Define quantos jogos marcar como completos (do 1 até o lastGameId atual)
        const maxGameId = state.lastGameId || 1301;
        const minGameId = 1; // Começar do jogo 1
        
        console.log(`🎯 Marcando jogos de ${minGameId} até ${maxGameId} como completos...`);
        
        let gamesAdded = 0;
        let gamesUpdated = 0;
        
        for (let gameId = minGameId; gameId <= maxGameId; gameId++) {
            if (state.gameData.pt[gameId]) {
                // Se o jogo já existe, verifica se precisa ser "completado"
                const game = state.gameData.pt[gameId];
                if (!game.foundWord || game.foundWord === "") {
                    // Marca como completo se ainda não estava
                    const word = generateRandomWord();
                    game.foundWord = word;
                    game.guessHistory = [[word, 0]];
                    game.lastGuess = [word, 0];
                    game.numberOfAttempts = 1;
                    game.gaveUp = "";
                    gamesUpdated++;
                }
            } else {
                // Cria um novo jogo completo
                state.gameData.pt[gameId] = createCompletedGame(gameId);
                gamesAdded++;
            }
        }
        
        // Atualiza o localStorage
        localStorage.setItem('state', JSON.stringify(state));
        
        console.log(`✅ Script concluído!`);
        console.log(`📈 ${gamesAdded} novos jogos criados`);
        console.log(`🔄 ${gamesUpdated} jogos existentes atualizados`);
        console.log(`🎮 Total de jogos no localStorage: ${Object.keys(state.gameData.pt).length}`);
        
        // Mostra notificação visual
        const notification = document.createElement('div');
        notification.textContent = `✅ ${gamesAdded + gamesUpdated} jogos marcados como completos!`;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.background = '#4CAF50';
        notification.style.color = '#fff';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        notification.style.fontSize = '16px';
        notification.style.zIndex = 9999;
        notification.style.fontFamily = 'Arial, sans-serif';
        notification.style.textAlign = 'center';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
        
        // Opcional: Recarregar a página para aplicar as mudanças
        console.log('🔄 Recarregando página em 3 segundos para aplicar mudanças...');
        setTimeout(() => {
            location.reload();
        }, 3000);
        
    } catch (error) {
        console.error('❌ Erro ao executar script:', error);
        alert('Erro ao executar script: ' + error.message);
    }
})();
