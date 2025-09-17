(function() {
    console.log('🎮 Iniciando script para marcar jogos ES como concluídos...');
    
    
    function generateRandomWord() {
        const words = ['hackeado por rbnwonknui '];
        return words[Math.floor(Math.random() * words.length)];
    }
    
    
    function createCompletedGame(gameId, word = null) {
        const chosenWord = word || generateRandomWord();
        return {
            gameId: gameId,
            guessHistory: [[chosenWord, 0]],
            lastGuess: [chosenWord, 0],
            foundWord: chosenWord,
            numberOfTips: 0,
            numberOfAttempts: 1,
            gaveUp: "",
            postGameHistory: []
        };
    }
    
    try {
        
        const currentState = localStorage.getItem('state');
        let state;
        
        if (currentState) {
            state = JSON.parse(currentState);
            console.log('📊 Estado atual encontrado');
        } else {
            
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
        
        
        if (!state.gameData) state.gameData = { pt: {}, en: {}, es: {} };
        if (!state.gameData.es) state.gameData.es = {};
        
        
        const maxGameId = state.lastGameId || 1301;
    const minGameId = 1;
        
        console.log(`🎯 Marcando jogos de ${minGameId} até ${maxGameId} como concluídos (ES)...`);
        
        let gamesAdded = 0;
        let gamesUpdated = 0;
        
        for (let gameId = minGameId; gameId <= maxGameId; gameId++) {
            if (state.gameData.es[gameId]) {
                
                const game = state.gameData.es[gameId];
                if (!game.foundWord || game.foundWord === "") {
                    
                    const word = generateRandomWord();
                    game.foundWord = word;
                    game.guessHistory = [[word, 0]];
                    game.lastGuess = [word, 0];
                    game.numberOfAttempts = 1;
                    game.gaveUp = "";
                    gamesUpdated++;
                }
            } else {
                
                state.gameData.es[gameId] = createCompletedGame(gameId);
                gamesAdded++;
            }
        }
        
        
        localStorage.setItem('state', JSON.stringify(state));
        
        console.log(`✅ Script finalizado!`);
        console.log(`📈 ${gamesAdded} novos jogos criados`);
        console.log(`🔄 ${gamesUpdated} jogos existentes atualizados`);
        console.log(`🎮 Total de jogos ES no localStorage: ${Object.keys(state.gameData.es).length}`);
        
        
        const notification = document.createElement('div');
        notification.textContent = `✅ ${gamesAdded + gamesUpdated} juegos ES marcados como completados!`;
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
        
        
        console.log('🔄 Recargando página en 3 segundos para aplicar cambios...');
        setTimeout(() => {
            location.reload();
        }, 3000);
        
    } catch (error) {
        console.error('❌ Error al ejecutar el script:', error);
        alert('Error al ejecutar el script: ' + error.message);
    }
})();
