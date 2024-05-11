import styles from "./styles.module.css";

export const ProfileSwitch = () => {
  return (
    <div className={styles.ProfileSwitch}>
      <p className={styles.ActiveSwitchText}>Отзывы</p>
      <p className={styles.SwitchText}>Изменения</p>
    </div>
  );
};
