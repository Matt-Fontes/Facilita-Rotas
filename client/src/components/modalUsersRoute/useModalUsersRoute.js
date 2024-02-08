import { useEffect, useState } from "react";
import Formatador from "../../utils/formatador";
import UserController from "../../controllers/userController";
import useRequest from "../../hooks/useRequest";

/**
 * Hook utilizado para separar concernimentos (lógica vs renderização)
 */
export default function useModalUsersRoute({ filtro = {} }) {

    const [getUsersRoute, loading, hasError] = useRequest(UserController.getUsersRoute);

    const [dados, setDados] = useState([]);

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
            render: telefone => telefone ? Formatador.formataTelefoneBrasil(telefone) : '',
        },
        {
            title: 'Coords',
            dataIndex: 'coordenadas',
            key: 'coords',
            render: (coords) => `(${coords.x},${coords.y})`,
            align: 'right'
        },
    ];

    useEffect(() => {
        getUsersRoute(filtro)
            .then(setDados)
            .catch(err => { })
    }, []);

    return {
        dados,
        colunasTabela,
        loading,
        hasError,
    }
}