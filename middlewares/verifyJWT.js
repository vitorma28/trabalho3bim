const jwt = require('jsonwebtoken');


function verifyJWT(req, res, next) {
    // 1. Obtém o token do cabeçalho Authorization
    // O padrão comum é: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Se não houver token, retorna 401 (Não autorizado)
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // 3. Verifica o token usando sua chave secreta
        const secret = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';
        const decoded = jwt.verify(token, secret);

        // 4. Adiciona os dados do payload ao objeto request
        req.user = decoded;

        // 5. Prossegue para a próxima função/rota
        next();
    } catch (error) {
        // 6. Se o token for inválido ou expirado
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
}


module.exports = { verifyJWT };
