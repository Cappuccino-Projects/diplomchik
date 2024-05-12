import React from 'react'
import {
	BackToMainMenu,
	MinimizeMenuButton,
	UserCard,
	ShopItemsWrapper
} from '@components'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export const Inventory = (props) => {
    return (
        <div className={styles.MenuWrapper}>
            <div className={styles.MenuTopButtonsWrapper}>
                <BackToMainMenu />
                <MinimizeMenuButton />
            </div>
            <UserCard ShowLvl={true} ShowBalance={true} IsItProfilePage={true} />
            <p className={styles.TitleText}>Инвентарь</p>
            <p className="DailyTasksAbout">
                Зарабатывайте фантики за выполнение ежедневных заданий и
                обменивайте их на предметы в магазине
            </p>
            <ShopItemsWrapper
                Obtained={false}
                shopitems={props.shopitems.filter(
                    (CurrentItem) => CurrentItem.ItemCategory === 'Avatar Frame'
                )}
                WrapperText="Рамки для аватара"
            />
        </div>
    )
}
