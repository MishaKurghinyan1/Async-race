// src/components/TextInput/TextInput.tsx
import styles from './TextInput.module.css';

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

// TextInput is now completely stateless and bulletproof
export function TextInput({ placeholder, value, onChange, disabled }: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={styles.inputContainer}
      disabled={disabled}
      required
    />
  );
}
