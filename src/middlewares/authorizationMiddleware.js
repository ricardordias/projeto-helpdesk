function authorize(...perfisPermitidos) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ erro: "Usuário não autenticado." });
        }
        if (!perfisPermitidos.includes(req.user.perfil)) {
            return res.status(403).json({ erro: "Acesso negado para este perfil." });
        }
        next();
    };
}

module.exports = authorize;