import styles from "./styles.module.css";

export const ShopItemCard = (props) => {
  let IconBackColor = props.item.ItemBackgroundColor;

  return (
    <div className={styles.ShopItemCard}>
      {props.item.ItemCategory === "Avatar Frame" && (
        <div className={styles.StopItemsImageWrapper}>
          <img
            className={styles.ShopItemAvatarFrame}
            src={"../img/" + props.item.ItemImage}
          />
          <img
            className={styles.ShopItemUserImage}
            src="../img/User1Avatar.png"
          />
        </div>
      )}
      {props.item.ItemCategory !== "Avatar Frame" && (
        <div
          className={styles.StopItemsImageWrapper}
          style={{
            backgroundColor: IconBackColor,
            border: "1px rgba(0, 0, 0, 0.1) solid",
          }}
        >
          <img
            className={styles.ShopItemImage}
            src={"../img/" + props.item.ItemImage}
          />
        </div>
      )}
      <p style={{ marginBottom: "auto" }}>{props.item.ItemName}</p>
      <div className={styles.UserBalance}>
        {/* Нету UserCardText */}
        <p className="UserCardText">{props.item.ItemPrice}</p>
        <img className={styles.SmallImg} src="../img/crystall.png" />
      </div>
    </div>
  );
};
