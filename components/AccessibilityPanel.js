// components/AccessibilityPanel.js
import React, { useContext, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Switch, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { ThemeContext } from '../context/ThemeContext';

export function AccessibilityPanel({ visible, onClose }) {
  const { theme, setColorMode, setFontScale, setFontFamily, setLibrasEnabled } = useContext(ThemeContext);
  const [tempMode, setTempMode] = useState(theme.colorMode);
  const [tempScale, setTempScale] = useState(theme.fontScale);
  const [tempFamily, setTempFamily] = useState(theme.fontFamily);
  const [tempLibras, setTempLibras] = useState(theme.librasEnabled);

  const apply = () => {
    setColorMode(tempMode);
    setFontScale(tempScale);
    setFontFamily(tempFamily);
    setLibrasEnabled(tempLibras);
    onClose?.();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent accessibilityViewIsModal>
      <View style={styles.backdrop} />
      <View style={[styles.panel, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.scale(18) }]}>
          Acessibilidade
        </Text>

        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.bodyText, fontFamily: theme.fontFamily, fontSize: theme.scale(16) }]}>
            Modo de cores
          </Text>
          <View style={styles.choices}>
            {['padrão', 'protanopia', 'deuteranopia', 'tritanopia', 'altoContraste'].map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => setTempMode(m)}
                accessibilityRole="button"
                accessibilityLabel={`Selecionar modo ${m}`}
                style={[
                  styles.choice,
                  { borderColor: theme.colors.divider, backgroundColor: tempMode === m ? theme.colors.background : 'transparent' }
                ]}
              >
                <Text style={{ color: theme.colors.bodyText, fontFamily: theme.fontFamily, fontSize: theme.scale(14) }}>
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.bodyText, fontFamily: theme.fontFamily, fontSize: theme.scale(16) }]}>
            Tamanho da fonte
          </Text>
          <Slider
            minimumValue={0.85}
            maximumValue={1.6}
            step={0.05}
            value={tempScale}
            onValueChange={setTempScale}
            accessibilityLabel="Ajustar tamanho da fonte"
          />
          <Text style={{ color: theme.colors.muted, fontFamily: theme.fontFamily, fontSize: theme.scale(12) }}>
            {tempScale.toFixed(2)}x
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.bodyText, fontFamily: theme.fontFamily, fontSize: theme.scale(16) }]}>
            Família da fonte
          </Text>
          <View style={styles.choices}>
            {['System', Platform.select({ ios: 'Arial', android: 'sans-serif', default: 'System' }), 'monospace'].map((fam) => (
              <TouchableOpacity
                key={fam}
                onPress={() => setTempFamily(fam)}
                style={[
                  styles.choice,
                  { borderColor: theme.colors.divider, backgroundColor: tempFamily === fam ? theme.colors.background : 'transparent' }
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Selecionar fonte ${fam}`}
              >
                <Text style={{ color: theme.colors.bodyText, fontFamily: fam, fontSize: theme.scale(14) }}>
                  {fam}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.row, { alignItems: 'center' }]}>
          <Text style={[styles.label, { color: theme.colors.bodyText, fontFamily: theme.fontFamily, fontSize: theme.scale(16) }]}>
            Libras (janela de intérprete)
          </Text>
          <Switch
            value={tempLibras}
            onValueChange={setTempLibras}
            accessibilityLabel="Ativar janela de intérprete de Libras"
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onClose} style={[styles.button, { borderColor: theme.colors.divider }]}>
            <Text style={{ color: theme.colors.bodyText, fontFamily: theme.fontFamily, fontSize: theme.scale(14) }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={apply} style={[styles.buttonPrimary, { backgroundColor: theme.colors.text }]}>
            <Text style={{ color: '#fff', fontFamily: theme.fontFamily, fontSize: theme.scale(14) }}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000077',
  },
  panel: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 12,
  },
  title: { 
    fontWeight: '700', 
    marginBottom: 12 
  },
  row: { 
    marginBottom: 16 
  },
  label: { 
    marginBottom: 8, 
    fontWeight: '600' 
  },
  choices: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8 
  },
  choice: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    gap: 12 
  },
  button: { 
    paddingVertical: 10, 
    paddingHorizontal: 14, 
    borderWidth: 1, 
    borderRadius: 10 
  },
  buttonPrimary: { 
    paddingVertical: 10, 
    paddingHorizontal: 14, 
    borderRadius: 10 
  },
});
