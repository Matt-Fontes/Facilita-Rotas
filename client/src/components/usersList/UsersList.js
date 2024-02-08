import { Alert, Button, Col, Divider, Form, Grid, Input, Row, Table, Typography, theme } from "antd";
import React, { useContext } from "react";
import { ClearOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import useUsersList from "./useUsersList";
import CardCalcularRota from "../CardCalcularRota";
import ModalCreateUser from "../modalCreateUser/ModalCreateUser";
import { ScrollContext } from "../../contexts/ScrollContext";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function UsersList() {

    const {
        dados,
        loading,
        hasError,
        colunasTabela,
        handleFiltrar,
        filtro,
        isModalOpen,
        setIsModalOpen,
    } = useUsersList();

    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const screens = useBreakpoint();

    const scrollRef = useContext(ScrollContext);

    const renderFiltro = () => (
        <Form form={form} onFinish={handleFiltrar}>
            <Row gutter={[12, 0]}>
                <Col span={24} md={12} lg={6}>
                    <Form.Item
                        name="nome"
                    >
                        <Input type="text" size="large" variant="filled" placeholder="Nome" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={6}>
                    <Form.Item
                        name="email"
                    >
                        <Input type="text" size="large" variant="filled" placeholder="Email" />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={6}>
                    <Form.Item
                        name="telefone"
                    >
                        <Input type="text" size="large" variant="filled" placeholder="Telefone" />
                    </Form.Item>
                </Col>
                <Col style={{ marginLeft: 'auto' }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <Button type="link" size="large" icon={<ClearOutlined />} onClick={() => form.resetFields()}>
                            Limpar
                        </Button>
                        <Button type="link" size="large" icon={<FilterOutlined />} htmlType="submit">
                            Filtrar
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );

    const renderError = () => (
        <Col span={24} style={{ marginBottom: 24 }}>
            <Alert type="warning" showIcon message="Ocorreu um problema ao buscar os usuários, por favor tente novamente." />
        </Col>
    );

    return (
        <>
            <ModalCreateUser
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onFinish={() => handleFiltrar(filtro)}
            />
            <Row ref={scrollRef} gutter={[48, 24]} style={{ margin: screens.md ? '0 32px' : 0 }}>
                <Col span={24} lg={16}>
                    <Row>
                        <Col span={12}>
                            <Title level={screens.md ? 1 : 2} style={{ textAlign: 'start', color: token.colorPrimary }}>Usuários</Title>
                        </Col>
                        <Col span={12} style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                            <Button
                                type="primary"
                                size={screens.md ? "large" : "middle"}
                                icon={<PlusOutlined />}
                                onClick={() => setIsModalOpen(true)}
                                style={{ marginBottom: '1.2em' }}
                            >
                                Adicionar Usuário
                            </Button>
                        </Col>
                        <Col span={24}>
                            <Divider />
                        </Col>
                        <Col span={24}>
                            {renderFiltro()}
                        </Col>
                        {hasError && renderError()}
                        <Col span={24}>
                            <Table
                                rowKey="id"
                                columns={colunasTabela}
                                dataSource={dados}
                                loading={loading}
                                scroll={{ x: true }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={24} lg={8}>
                    <CardCalcularRota filtro={filtro} />
                </Col>
            </Row>
        </>
    );
}