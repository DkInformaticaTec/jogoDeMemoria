// context/ThemeContext.js
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const STORAGE_KEY = '@acessibilidade_prefs_v1';

// Paletas amigáveis a daltonismo + alto contraste
const palettes = {
  default: {
    background: '#e8f5e9',
    surface: '#ffffff',
    text: '#2e7d32',
    bodyText: '#4a4a4a',
    muted: '#555',
    divider: '#dddddd',
    shadow: '#000000',
    // Cores dos biomas (tokenizadas)
    biomas: {
      Amazonia: '#4caf50',
      Cerrado: '#fbc02d',
      Caatinga: '#ff7043',
      MataAtlantica: '#388e3c',
    },
  },
  protanopia: {
    background: '#eef3ff',
    surface: '#ffffff',
    text: '#1a237e',
    bodyText: '#2d2d2d',
    muted: '#4a4a4a',
    divider: '#cfd8dc',
    shadow: '#000000',
    biomas: {
      Amazonia: '#5c6bc0',   // azul médio
      Cerrado: '#8d6e63',    // marrom
      Caatinga: '#00838f',   // teal
      MataAtlantica: '#3949ab'// azul escuro
    },
  },
  deuteranopia: {
    background: '#f3f5ff',
    surface: '#ffffff',
    text: '#283593',
    bodyText: '#2e2e2e',
    muted: '#4a4a4a',
    divider: '#c5cae9',
    shadow: '#000000',
    biomas: {
      Amazonia: '#3f51b5',
      Cerrado: '#ff8a65',   // laranja suave
      Caatinga: '#00897b',  // verde-azulado
      MataAtlantica: '#5e35b1'
    },
  },
  tritanopia: {
    background: '#f9f4e7',
    surface: '#ffffff',
    text: '#4e342e',
    bodyText: '#3a3a3a',
    muted: '#5f5f5f',
    divider: '#e0d7c2',
    shadow: '#000000',
    biomas: {
      Amazonia: '#6d4c41',  // marrom
      Cerrado: '#f9a825',   // amarelo forte
      Caatinga: '#8e24aa',  // roxo
      MataAtlantica: '#2e7d32'
    },
  },
  altoContraste: {
    background: '#000000',
    surface: '#111111',
    text: '#FFFFFF',
    bodyText: '#FFFFFF',
    muted: '#E0E0E0',
    divider: '#555555',
    shadow: '#000000',
    biomas: {
      Amazonia: '#FFFFFF',
      Cerrado: '#FFFFFF',
      Caatinga: '#FFFFFF',
      MataAtlantica: '#FFFFFF',
    },
  },
};

export function ThemeProvider({ children }) {
  const systemScheme = Appearance.getColorScheme();

  const [colorMode, setColorMode] = useState('default');
  const [fontScale, setFontScale] = useState(1.0);
  const [fontFamily, setFontFamily] = useState('System');
  const [librasEnabled, setLibrasEnabled] = useState(false);

  // Carrega preferências
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.colorMode) setColorMode(parsed.colorMode);
          if (parsed.fontScale) setFontScale(parsed.fontScale);
          if (parsed.fontFamily) setFontFamily(parsed.fontFamily);
          if (typeof parsed.librasEnabled === 'boolean') setLibrasEnabled(parsed.librasEnabled);
        }
      } catch {}
    })();
  }, []);

  // Salva preferências
  useEffect(() => {
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ colorMode, fontScale, fontFamily, librasEnabled })
    ).catch(() => {});
  }, [colorMode, fontScale, fontFamily, librasEnabled]);

  const palette = palettes[colorMode] ?? palettes.default;

  const theme = useMemo(() => {
    return {
      colorMode,
      fontScale,
      fontFamily,
      librasEnabled,
      colors: palette,
      // Helpers
      getBiomaColor: (key) => palette.biomas[key] ?? '#9e9e9e',
      scale: (size) => Math.round(size * fontScale),
    };
  }, [colorMode, fontScale, fontFamily, librasEnabled]);

  const value = useMemo(() => ({
    theme,
    setColorMode,
    setFontScale,
    setFontFamily,
    setLibrasEnabled,
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
