import React from "react";

import { ConfigProvider, theme } from "antd";

/**
 * Provider para definir propriedades do tema do Ant Design
 */
export function ThemeProvider({ children, locale }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#006bd9",
          colorInfo: "#006bd9",
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <div>{children}</div>
    </ConfigProvider>
  );
}
