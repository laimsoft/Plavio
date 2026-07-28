import { MaterialIcons } from '@expo/vector-icons';

export type SettingsRow = {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export type SettingsSection = {
  key: string;
  rows: SettingsRow[];
};
