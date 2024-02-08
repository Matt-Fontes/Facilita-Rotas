import { Card, Col, Row } from "antd";
import React from "react";
import HeroBanner from "./HeroBanner";
import UsersList from "./usersList/UsersList";
import Footer from "./Footer";

export default function Container() {
    return (
        <Card>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <HeroBanner />
                </Col>
                <Col span={24}>
                    <UsersList />
                </Col>
                <Col span={24}>
                    <Footer />
                </Col>
            </Row>
        </Card>
    );
}