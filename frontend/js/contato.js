// Front-end que envia para o backend
document.getElementById('form-contato')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formStatus = document.getElementById('form-status');
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Mostra loading
    formStatus.textContent = 'Enviando...';
    formStatus.className = 'form-status';
    
    try {
        // Tenta enviar para o backend (se estiver rodando)
        const response = await fetch('http://localhost:3000/api/contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, mensagem })
        });
        
        if (response.ok) {
            formStatus.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
            formStatus.className = 'form-status success';
            document.getElementById('form-contato').reset();
        } else {
            throw new Error('Erro no servidor');
        }
    } catch (error) {
        // Se o backend não estiver rodando, salva no localStorage (fallback)
        const mensagens = JSON.parse(localStorage.getItem('contatos') || '[]');
        mensagens.push({ nome, email, mensagem, data: new Date().toISOString() });
        localStorage.setItem('contatos', JSON.stringify(mensagens));
        
        formStatus.textContent = 'Mensagem salva localmente! (Backend não disponível)';
        formStatus.className = 'form-status success';
        document.getElementById('form-contato').reset();
        
        console.log('Mensagem salva no localStorage:', { nome, email, mensagem });
    }
});