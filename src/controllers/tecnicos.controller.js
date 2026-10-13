const pool = require("../config/database");

const listarTecnicos = async (req, res, next) => {
    try {
        const [tecnicos] = await pool.query("SELECT id, nome, email FROM tb_tecnicos");
        return res.status(200).json(tecnicos);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listarTecnicos
};

