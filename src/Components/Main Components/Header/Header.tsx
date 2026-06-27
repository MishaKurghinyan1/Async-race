import styles from './Header.module.css';
import Garage from '@/assets/IMGs/garage.png';
import Winners from '@/assets/IMGs/winners.png';
import Logo from '@/assets/IMGs/logo.png';
import { TextInput } from '@/Components/TextInput/TextInput';
import { useState } from 'react';

export function Header() {
  const [createColor, setCreateColor] = useState('');
  const [updateColor, setUpdateColor] = useState('');
  const [garage, setGarage] = useState(true);
  const [winners, setWinners] = useState(false);
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.icons}>
          <div className={styles.icon}>
            <img src={Garage} alt="Garage" />
          </div>
          <div className={styles.icon}>
            <img src={Winners} style={{ alignSelf: 'stretch' }} alt="Winners" />
          </div>
        </div>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo" className={styles.logoImage} />
        </div>
      </nav>
      <div className={styles.inputsContainer}>
        <div className={styles.editor}>
          <div className={styles.inputGroup}>
            <TextInput placeholder="Create car name" />
            <input
              type="color"
              defaultValue="#f00"
              onChange={(e) => setCreateColor(e.target.value)}
              required
            />
          </div>
          <button className={styles.button} onClick={create}>
            Create Car
          </button>
        </div>
        <div className={styles.editor}>
          <div className={styles.inputGroup}>
            <TextInput placeholder="Update car name" />
            <input
              type="color"
              defaultValue="#f00"
              onChange={(e) => setUpdateColor(e.target.value)}
              required
            />
          </div>
          <button className={styles.button} onClick={update}>
            Update Car
          </button>
        </div>
      </div>
    </header>
  );
}

function create() {
  console.log('Create button clicked');
}

function update() {
  console.log('Update button clicked');
}
