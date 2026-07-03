import styles from './Header.module.css';
import Garage from '@/assets/images/icons/garage.png';
import Winners from '@/assets/images/icons/winners.png';
import Logo from '@/assets/images/logo.png';
import { useSetValue } from '@/store';

export function Header() {
  const setValue = useSetValue();

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.icons}>
          <button
            className={styles.icon}
            onClick={() => {
              setValue(true);
            }}
          >
            <img src={Garage} alt="Garage" />
          </button>
          <button
            className={styles.icon}
            onClick={() => {
              setValue(false);
            }}
          >
            <img src={Winners} style={{ alignSelf: 'stretch' }} alt="Winners" />
          </button>
        </div>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo" className={styles.logoImage} />
        </div>
      </nav>
    </header>
  );
}
