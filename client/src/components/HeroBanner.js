import React, { useContext } from "react";
import BigPinImg from './../assets/bigPin.png';
import marker from './../assets/marker.png';
import { Button, Col, Grid, Row, theme } from "antd";
import { ScrollContext } from "../contexts/ScrollContext";

const { useBreakpoint } = Grid;


export default function HeroBanner() {

    const scrollRef = useContext(ScrollContext);
    console.log(scrollRef);

    const { token } = theme.useToken();
    const screens = useBreakpoint();

    const scrollIntoView = () => scrollRef.current.scrollIntoView();

    const renderMainTexts = () => (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: screens.lg ? 'start' : 'center',
            alignItems: screens.lg ? 'start' : 'center',
            marginLeft: screens.lg ? 64 : 0,
            paddingTop: screens.lg ? 0 : '48px',
        }}>
            <div
                style={{
                    fontSize: 'clamp(36px, 4vw, 64px)',
                    fontWeight: 600
                }}
            >
                Facilita Rotas
            </div>
            <div style={{
                color: token.colorTextTertiary,
                fontSize: 18,
            }}>
                Um facilitador para encontrar a melhor rota para você e a sua equipe!
            </div>
            <Button
                type="primary"
                size="large"
                style={{ marginTop: 24 }}
                onClick={scrollIntoView}
            >
                Explorar
            </Button>
        </div>
    );

    const renderImage = () => (
        <div
            style={{
                width: 'clamp(300px ,90%, 700px)',
                height: screens.md ? 700 : 400,
                margin: 'auto',
                marginTop: screens.md ? 0 : 48,
                backgroundImage: `url(${BigPinImg})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                maxWidth: '90vw',
            }}
        />
    );

    return (
        <Row>
            <div
                style={{
                    position: 'absolute',
                    backgroundImage: `url(${marker})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: 28,
                    height: 40,
                }}
            />
            <Col span={24} lg={10}>
                {renderMainTexts()}
            </Col>
            <Col span={24} lg={14}>
                {renderImage()}
            </Col>
        </Row>
    );
}