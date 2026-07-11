import styles from './TextInput.module.css';

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

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
