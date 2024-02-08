import { Modal, Table } from "antd";
import React from "react";
import PropTypes from 'prop-types';
import useModalUsersRoute from "./useModalUsersRoute";

export default function ModalUsersRoute({
    open,
    filtro,
    onClose,
}) {

    const {
        dados,
        colunasTabela,
        loading,
    } = useModalUsersRoute({ filtro });

    return (
        <Modal
            title="Melhor Rota"
            open={open}
            footer={null}
            destroyOnClose
            onCancel={onClose}
        >
            <Table
                dataSource={dados}
                columns={colunasTabela}
                loading={loading}
            />
        </Modal>
    )
}

ModalUsersRoute.propTypes = {
    filtro: null,
    onClose: () => { },
}

ModalUsersRoute.propTypes = {
    open: PropTypes.bool.isRequired,
    filtro: PropTypes.object,
    onClose: PropTypes.func,
};