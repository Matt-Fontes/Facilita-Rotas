const pool = require('./db')

const createInitialDatabaseStructure = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100),
                email VARCHAR(100),
                telefone VARCHAR(13),
                coordenadas POINT
            )`
        );
        console.log('Tabela criada com sucesso');
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    createInitialDatabaseStructure
}