import UserController from "../../controllers/userController"
import useRequest from "../../hooks/useRequest"

/**
 * Hook utilizado para separar concernimentos (lógica vs renderização)
 */
export default function useModalCreateUser({
    onFinish,
    onClose,
}) {

    const [createUser, loading, error] = useRequest(UserController.createUser);

    const handleSubmit = values => {
        createUser(values)
            .then(() => {
                onFinish();
                onClose();
            })
            .catch(err => { })
    }

    return {
        handleSubmit,
        loading,
        error,
    };
}