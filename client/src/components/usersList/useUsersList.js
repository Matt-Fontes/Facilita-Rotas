import { useEffect, useState } from "react";
import UserController from "../../controllers/userController";
import useRequest from "../../hooks/useRequest";
import Formatador from "../../utils/formatador";

/**
 * Hook utilizado para separar concernimentos (lógica vs renderização)
 */
export default function useUsersList() {

    const [getUsers, loading, hasError] = useRequest(UserController.getUsers);

    const [dados, setDados] = useState([]);
    const [filtro, setFiltro] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const colunasTabela = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: nome => <b>{nome}</b>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
            key: 'telefone',
            align: 'right',
            render: telefone => Formatador.formataTelefoneBrasil(telefone),
        },
        {
            title: 'Coords',
            dataIndex: 'coordenadas',
            key: 'coords',
            render: (coords) => `(${coords.x},${coords.y})`,
            align: 'right'
        },
    ];

    /**
     * Função chamada ao clicar em Filtrar
     * @param {{
     *  nome: String,
     *  email: String,
     *  telefone: String
     * }} filtro 
     */
    const handleFiltrar = filtro => {
        setFiltro(filtro);
        getUsers(filtro)
            .then(setDados)
            .catch()
    }

    useEffect(() => {
        getUsers({})
            .then(setDados)
            .catch()
    }, []);

    return {
        dados,
        loading,
        hasError,
        colunasTabela,
        handleFiltrar,
        filtro,
        isModalOpen,
        setIsModalOpen,
    };
}