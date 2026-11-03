const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido." });
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ erro: "Formato do token inválido. Use: Bearer <token>." });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // { id, nome, email, perfil, solicitante_id, tecnico_id }
        next();
    } catch (error) {
        return res.status(401).json({ erro: "Token inválido ou expirado." });
    }
}

module.exports = authMiddleware;