import React, { createContext, useContext } from 'react';

// 建立 Context
const I18nContext = createContext(undefined);

// Provider 元件
export const I18nProvider = ({ children, dict }) => {
  return <I18nContext.Provider value={dict}>{children}</I18nContext.Provider>;
};

// Hook：使用 i18n context
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n 必須在 I18nProvider 中使用');
  }
  return context;
};
