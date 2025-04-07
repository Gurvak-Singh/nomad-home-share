import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  Language, 
  languages, 
  Currency, 
  currencies, 
  translations,
  exchangeRates
} from "./languageData";

// Define context type
interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => void;
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
  setCurrency: (code: string) => void;
  t: (key: string) => string;
  formatPrice: (amount: number) => string;
  convertPrice: (amount: number) => number;
}

// Create context
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  currency: currencies[0],
  setCurrency: () => {},
  t: (key) => key,
  formatPrice: (amount) => `$${amount}`,
  convertPrice: (amount) => amount,
});

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState(currencies[0]);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("nomad_language");
    const savedCurrency = localStorage.getItem("nomad_currency");
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    if (savedCurrency) {
      const currencyObj = currencies.find(c => c.code === savedCurrency);
      if (currencyObj) {
        setCurrency(currencyObj);
      }
    }
  }, []);

  // Save preferences to localStorage when changed
  useEffect(() => {
    localStorage.setItem("nomad_language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("nomad_currency", currency.code);
  }, [currency]);

  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to English
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    
    // Return the key if no translation found
    return key;
  };

  // Currency functions
  const handleSetCurrency = (code: string) => {
    const currencyObj = currencies.find(c => c.code === code);
    if (currencyObj) {
      setCurrency(currencyObj);
    }
  };

  const convertPrice = (amount: number): number => {
    const rate = exchangeRates[currency.code] || 1;
    return amount * rate;
  };

  const formatPrice = (amount: number): string => {
    const convertedAmount = convertPrice(amount);
    
    // Format based on currency
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: 0
    }).format(convertedAmount);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currency,
        setCurrency: handleSetCurrency,
        formatPrice,
        convertPrice
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
