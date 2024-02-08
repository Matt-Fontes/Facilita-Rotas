import axios from "../factory/axios-config"

export default class UserController {

    /**
     * Get de Listagem de Usuários
     * @param {{
     *   nome: String,
     *   email: String,
     *   telefone: String,
     * }} 
     * @returns {Promise<{
     *   id: String,
     *   nome: String,
     *   email: String,
     *   telefone: Number,
     * }[]}>
     */
    static getUsers = ({
        nome,
        email,
        telefone,
    }) => new Promise((resolve, reject) => {

        const body = {
            nome,
            email,
            telefone,
        };

        axios.get('users', { params: body })
            .then(response => resolve(response.data))
            .catch(reject)
    })

    /**
     * Criação de Usuário
     * @param {{
     *   nome: String,
     *   email: String,
     *   telefone: String,
     * }} 
     * @returns {Promise<{}}>
     */
    static createUser = ({
        nome,
        email,
        telefone,
        x,
        y,
    }) => new Promise((resolve, reject) => {

        const body = {
            nome,
            email,
            telefone: parseInt(telefone),
            coordenadas: `(${x},${y})`,
        };

        axios.post('users', body)
            .then(response => resolve(response.data))
            .catch(reject)
    })

    /**
     * Get de Listagem de Usuários
     * @param {{
     *   nome: String,
     *   email: String,
     *   telefone: String,
     * }} 
     * @returns {Promise<{
     *   id: String,
     *   nome: String,
     *   email: String,
     *   telefone: Number,
     * }[]}>
     */
    static getUsersRoute = ({
        nome,
        email,
        telefone,
    }) => new Promise((resolve, reject) => {

        const body = {
            nome,
            email,
            telefone,
        };

        axios.get('users/route', { params: body })
            .then(response => resolve(response.data))
            .catch(reject)
    })

}
