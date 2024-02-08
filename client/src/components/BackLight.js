import { theme } from "antd";
import React from "react";

/**
 * Luz de fundo
 */
export default function BackLight() {

    const { token } = theme.useToken();

    return (
        <div style={{
            position: 'fixed',
            zIndex: -1,
            width: '100vw',
            height: '100vh',
        }}>

            <div
                style={{
                    width: '75vw',
                    height: '75vw',
                    background: token.colorPrimary,
                    borderRadius: '50%',
                    filter: 'blur(4vw)',
                }}
            />
        </div>

    );
}