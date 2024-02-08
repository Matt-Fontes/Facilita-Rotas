import { Col, Divider, Grid, Row, Typography } from "antd";

const { Text } = Typography;
const { useBreakpoint } = Grid;

export default function Footer() {
    const screens = useBreakpoint();
    return (
        <Row style={{ margin: screens.md ? '0 64px' : 0 }}>
            <Col span={24}>
                <Divider />
            </Col>
            <Col span={24} style={{ padding: '12px 0', textAlign: 'center' }}>
                <Text type="secondary">{new Date().getFullYear()} © Matheus Fontes</Text>
            </Col>
        </Row>
    )
}