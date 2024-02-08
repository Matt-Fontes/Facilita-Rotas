import { Alert, Button, Col, Divider, Form, Input, Modal, Row } from "antd";

import PropTypes from 'prop-types';
import useModalCreateUser from "./useModalCreateUser";
import { emailRule, phoneRule, requiredRule } from "../../utils/rules";
import Normalizer from "../../utils/normalizer";

export default function ModalCreateUser({
    open,
    onFinish,
    onClose,
}) {

    const {
        handleSubmit,
        loading,
        error,
    } = useModalCreateUser({
        onFinish,
        onClose,
    });

    const renderError = () => (
        <Col span={24}>
            <Alert type="warning" showIcon message="Ocorreu um problema ao cadastrar o usuário, por favor tente novamente." />
        </Col>
    );

    return (
        <Modal
            title="Cadastro de usuário"
            open={open}
            footer={null}
            closable={false}
            destroyOnClose
        >
            <Divider />
            <Form
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Row gutter={[24, 0]}>
                    <Col span={24}>
                        <Form.Item
                            label="Nome"
                            name="nome"
                            required
                            rules={[
                                requiredRule
                            ]}
                        >
                            <Input type="text" placeholder="Digite o nome do usuário" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                            required
                            rules={[
                                requiredRule,
                                emailRule
                            ]}
                        >
                            <Input type="text" placeholder="Digite o email do usuário" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Telefone"
                            name="telefone"
                            required
                            rules={[
                                requiredRule,
                                phoneRule
                            ]}
                            normalize={Normalizer.apenasNumeros}
                        >
                            <Input type="text" placeholder="Digite o telefone do usuário" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Coord x"
                            name="x"
                            required
                            rules={[
                                requiredRule
                            ]}
                            normalize={Normalizer.apenasNumeros}
                        >
                            <Input type="text" placeholder="x" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Coord y"
                            name="y"
                            required
                            rules={[
                                requiredRule
                            ]}
                            normalize={Normalizer.apenasNumeros}
                        >
                            <Input type="text" placeholder="y" />
                        </Form.Item>
                    </Col>
                    {error && renderError()}
                    <Col span={24}>
                        <Divider />
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'end' }}>
                            <Button disabled={loading} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Cadastrar
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

ModalCreateUser.defaultProps = {
    onFinish: () => { },
    onClose: () => { },
};

ModalCreateUser.propTypes = {
    open: PropTypes.bool.isRequired,
    onFinish: PropTypes.func,
    onClose: PropTypes.func,
};
