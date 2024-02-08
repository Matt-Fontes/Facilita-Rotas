const pool = require('./../db');
const { antColonyTSP } = require('./algorithms/antColonyOptimization');

const buildQueryStringWithFilter = (nome, email, telefone) => {
    let query = 'SELECT * FROM users';

    const conditions = [];

    if (nome) {
        conditions.push(`nome ILIKE '%${nome}%'`);
    }
    if (email) {
        conditions.push(`email ILIKE '%${email}%'`);
    }
    if (telefone) {
        conditions.push(`telefone ILIKE '%${telefone}%'`);
    }

    if (conditions.length) {
        query += ` WHERE ${conditions.join(" AND ")}`;
    }

    return query;
}

/**
 * Lista os usuários
 * @returns {{
 *  id: Number,
 *  nome: String,
 *  email: String,
 *  telefone: Number,
 *  coordenadas: {
 *   x: Number,
 *   y: Number,
 *  }
 * }[]}
 */
const getUsers = async (req, res) => {
    try {
        const {
            nome,
            email,
            telefone,
        } = req.query;

        const query = buildQueryStringWithFilter(nome, email, telefone)

        const data = await pool.query(query);
        console.log('Usuários retornados');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

const createUser = async (req, res) => {
    const { nome, email, telefone, coordenadas } = req.body;
    try {
        await pool.query(`
            INSERT INTO users (
                nome,
                email,
                telefone,
                coordenadas
            ) VALUES ($1, $2, $3, $4::point)`,
            [nome, email, telefone, coordenadas]
        );
        console.log('Usuário criado');
        res.status(200).send({ message: 'Usuário criado com sucesso' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

const getUsersRoute = async (req, res) => {
    try {
        const {
            nome,
            email,
            telefone,
        } = req.query;

        const query = buildQueryStringWithFilter(nome, email, telefone)

        const data = await pool.query(query);

        const users = data.rows;

        users.unshift({
            nome: 'Origem',
            coordenadas: {
                x: 0,
                y: 0,
            }
        });

        const usersCoords = users.map(user => user.coordenadas);

        const sortedCoords = antColonyTSP(usersCoords);

        const sortedUsers = users.sort((userA, userB) => sortedCoords.indexOf(users.indexOf(userA)) - sortedCoords.indexOf(users.indexOf(userB)));

        console.log('Usuários retornados');
        res.status(200).send(sortedUsers);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports = {
    getUsers,
    createUser,
    getUsersRoute,
}