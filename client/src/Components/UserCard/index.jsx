import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const UserCard = (props) => {
  let MB = 30;

  if (props.IsItProfilePage) {
    MB = 0;
  }

  return (
    <Link to="/profile">
      <div style={{ marginBottom: MB + "px" }} className={styles.UserCardWrapper}>
        <div className={styles.UserInfoWrapper}>
          <img className={styles.UserCardImage} src="../img/User1Avatar.png" />
          <div className={styles.UserCardInfo}>
            <p className={styles.UserName}>Щуковская Анастасия</p>
            <p className={styles.UserRole}>Проверенный пользователь </p>
          </div>
        </div>
        {props.ShowLvl && (
          <div className={styles.UserLvlWrapper}>
            {/* Нет UserCardText */}
            <p className="UserCardText">6</p>
            <div className={styles.UserLvlProgressWrapper}>
              <div style={{ width: "16%" }} className={styles.UserLvlProgress}></div>
            </div>
            {/* Нет UserCardText */}
            <p className="UserCardText">7</p>
          </div>
        )}
        {this.props.ShowBalance && (
          <div className={styles.UserLvlWrapper}>
            {/* Нет UserCardText */}
            <p className="UserCardText">Баланс</p>
            <div className={styles.UserBalance}>
              {/* Нет UserCardText */}
              <p className="UserCardText">542 фантики</p>
              <img className={styles.SmallImg} src="../img/crystall.png" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
