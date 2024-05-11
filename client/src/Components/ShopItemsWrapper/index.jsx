import { ShopItemCard } from "@components/ShopItemCard";
import styles from "./styles.module.css";

export const ShopItemsWrapper = (props) => {
  return (
    <div>
      <p style={{ marginBottom: "10px" }}>{props.WrapperText}</p>
      <div className={styles.ShopItemsWrapper}>
        {props.shopitems?.map((CurrentItem) => (
          <ShopItemCard key={CurrentItem.ItemId} item={CurrentItem} />
        ))}
      </div>
    </div>
  );
};

