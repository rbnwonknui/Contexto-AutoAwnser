(async function() {
    const gameSpan = document.evaluate("/html/body/div/div/main/div[3]/span[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!gameSpan) return;

    const gameNumber = gameSpan.textContent.trim().replace('#', '');
    
    const response = await fetch(`https://api.contexto.me/machado/pt-br/giveup/${gameNumber}`);
    const data = await response.json();

    const targetDiv = document.evaluate("/html/body/div/div/main/div[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (targetDiv) {
        targetDiv.innerHTML = `
            <div class="how-to-play">
                <div>
                    <div class="modal-title">
                        <span class="material-symbols-rounded">help</span>
                        <h2>Sobre</h2>
                    </div>
                    <p>Olá! Me chamo rbnwonknui e sou desenvolvedor do Contexto AutoAnswer.</p>
                    <p>Essa automação descobre a palavra do contexto de forma automática, para que você não perca tempo procurando em sites alternativos quando estiver cansado ou quiser desistir.</p>
                    <p>Também tenho outras ferramentas como Termo, Palavreio, Letroso, Contexto, Conexo, entre outros, todos com o mesmo intuito.</p>
                    <p>Se precisar de outras automações, dê uma passada no <a href="https://github.com/rbnwonknui" target="_blank" style="text-decoration: underline;">meu GitHub</a>.</p>
                </div>
            </div>
        `;
    }

    const notification = document.createElement('div');
    notification.textContent = `Palavra: ${data.word}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = '#3a3a3a';
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
    }, 10000);
})();
