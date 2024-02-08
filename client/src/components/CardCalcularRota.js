import { BranchesOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Row, Tooltip, Typography, theme } from "antd";
import PropTypes from 'prop-types';
import { useState } from "react";
import ModalUsersRoute from "./modalUsersRoute/ModalUsersRoute";

const { Title } = Typography;

export default function CardCalcularRota({
    filtro
}) {

    const { token } = theme.useToken();
    const [applyFilter, setApplyFilter] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Card>
            {isModalOpen && (
                <ModalUsersRoute
                    open={isModalOpen}
                    filtro={applyFilter ? filtro : undefined}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <div style={{ display: 'flex', gap: 24, justifyContent: 'space-between' }}>
                        <Title level={3} style={{ margin: 0 }}><BranchesOutlined /> Calcular melhor rota</Title>
                        <Tooltip title="A rota é calculada utilizando o algoritmo de otimização de colônias de formigas, de Marco Dorigo.">
                            <Button size="large" type="text" icon={<QuestionCircleOutlined />} />
                        </Tooltip>
                    </div>
                </Col>
                <Col span={24} style={{
                    textAlign: 'start',
                    padding: '0 32px'
                }}>
                    <span
                        style={{
                            display: 'block',
                            color: token.colorTextSecondary,
                            marginBottom: 12
                        }}>
                        Calcule o melhor caminho para visitar todos os clientes e voltar ao ponto de partida.
                    </span>
                    <Tooltip mouseEnterDelay={0.2} title="Calcular a rota apenas dos usuários filtrados na listagem.">
                        <Checkbox
                            onChange={e => setApplyFilter(e.target.checked)}
                        >
                            Aplicar filtro de listagem
                        </Checkbox>
                    </Tooltip>
                </Col>
                <Col span={24}>
                    <Button
                        style={{ float: 'right', marginRight: 32 }}
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Calcular
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

CardCalcularRota.defaultProps = {
    filtro: null,
}

CardCalcularRota.propTypes = {
    filtro: PropTypes.object,
}