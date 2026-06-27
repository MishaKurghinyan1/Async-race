import { type ReactNode } from 'react';
import styles from './Frame.module.css';

type FrameProps = {
  children: ReactNode;
};

export default function Frame({ children }: FrameProps) {
  return <section className={styles.frame}>{children}</section>;
}
