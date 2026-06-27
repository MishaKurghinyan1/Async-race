import styles from './ListItem.module.css';

type ListItemProps = {
  position: number;
  carName: string;
  raceCount: number;
  fastestRace: string;
};

export function ListItem({
  position,
  carName,
  raceCount,
  fastestRace,
}: ListItemProps) {
  return (
    <div className={styles.listItem}>
      <h2 className={styles.itemDescription}>{position}</h2>
      <h2 className={styles.itemDescription}>{carName}</h2>
      <h2 className={styles.itemDescription}>{raceCount}</h2>
      <h2 className={styles.itemDescription}>{fastestRace}</h2>
    </div>
  );
}
