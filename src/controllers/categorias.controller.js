const pool = require("../config/database");

const listarCategorias = async (req, res, next) => {
    try {
        const [categorias] = await pool.query("SELECT id, nome, descricao FROM tb_categorias");
        return res.status(200).json(categorias);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listarCategorias
};

