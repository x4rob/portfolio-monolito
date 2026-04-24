const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rota de contato
app.post('/api/contato', async (req, res) => {
    const { nome, email, mensagem } = req.body;
    
    // Validação
    if (!nome || !email || !mensagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    try {
        // Configurar transporte de email (opcional)
        // Por enquanto, só loga e salva
        console.log(`📧 Contato recebido:`);
        console.log(`   Nome: ${nome}`);
        console.log(`   Email: ${email}`);
        console.log(`   Mensagem: ${mensagem}`);
        
        // TODO: Adicionar email real ou salvar no banco
        
        res.json({ success: true, message: 'Mensagem recebida com sucesso!' });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});