import styles from "./styles.module.css";

export const LogoWrapper = (props) => {
  return (
    <div className={styles.TitleWrapper}>
      <a href="/mainmenu">
        <img className="Logo" src="../img/Logo.png"></img>
      </a>
      <div className={styles.TitleCityWrapper}>
        <h1 className={styles.TitleText}>Всеместа</h1>
        <i style={{ color: "#909090" }} className="fi fi-sr-marker"></i>
        <p className={styles.TitleCity}>{props.city}</p>
      </div>
    </div>
  );
};
