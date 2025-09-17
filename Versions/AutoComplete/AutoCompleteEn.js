(function() {
    console.log('🎮 Starting script to mark EN games as completed...');
    
    
    function generateRandomWord() {
        const words = ['Hacked By rbnwonknui '];
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
            console.log('📊 Current state found');
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
            console.log('📝 Creating new state');
        }
        
        
        if (!state.gameData) state.gameData = { pt: {}, en: {}, es: {} };
        if (!state.gameData.en) state.gameData.en = {};
        
        
        const maxGameId = state.lastGameId || 1301;
    const minGameId = 1;
        
        console.log(`🎯 Marking games from ${minGameId} to ${maxGameId} as completed (EN)...`);
        
        let gamesAdded = 0;
        let gamesUpdated = 0;
        
        for (let gameId = minGameId; gameId <= maxGameId; gameId++) {
            if (state.gameData.en[gameId]) {
                
                const game = state.gameData.en[gameId];
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
                
                state.gameData.en[gameId] = createCompletedGame(gameId);
                gamesAdded++;
            }
        }
        
        
        localStorage.setItem('state', JSON.stringify(state));
        
        console.log(`✅ Script completed!`);
        console.log(`📈 ${gamesAdded} new games created`);
        console.log(`🔄 ${gamesUpdated} existing games updated`);
        console.log(`🎮 Total EN games in localStorage: ${Object.keys(state.gameData.en).length}`);
        
        
        const notification = document.createElement('div');
        notification.textContent = `✅ ${gamesAdded + gamesUpdated} EN games marked as completed!`;
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
        
        
        console.log('🔄 Reloading page in 3 seconds to apply changes...');
        setTimeout(() => {
            location.reload();
        }, 3000);
        
    } catch (error) {
        console.error('❌ Error executing script:', error);
        alert('Error executing script: ' + error.message);
    }
})();