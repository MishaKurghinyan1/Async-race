import { useState } from 'react';
import styles from './TextInput.module.css';

export function TextInput({ placeholder }: { placeholder?: string }) {
  const [value, setValue] = useState('');
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={styles.inputContainer}
      required
    />
  );
}
