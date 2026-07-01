import styles from './Frame.module.css';
import type { FrameProps } from '@/types/frame.type';

export default function Frame({ children }: FrameProps) {
  return <section className={styles.frame}>{children}</section>;
}
