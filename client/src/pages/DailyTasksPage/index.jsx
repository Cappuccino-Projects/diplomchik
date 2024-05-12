import React, { Component } from 'react'
import { Link } from "react-router-dom";

import {
	DailyTasks,
	MinimizeMenuButton,
	BackToMainMenu,
	UserCard,
    DailyTasksWrapper,
} from '@components'

import styles from "./styles.module.css";

export const DailyTasksPage = (props) => {
    return (
        <div className={styles.MenuWrapper}>

        <div className={styles.Title}>
        <BackToMainMenu/>
        <MinimizeMenuButton />
        </div>

        <UserCard ShowLvl = {true} ShowBalance = {true} IsItProfilePage = {true}/>
        <div className={styles.MainMenuButtonsWrapper}>
              <Link to = "/shop"><div className={styles.MainMenuButton}>
              <img className = {styles.SmallImg} src = "../img/shop.png"/>
              <p>В магазин</p>
              </div></Link>
        </div>

        <DailyTasks ShowInfo = {true} ShowLvl = {false}/>

        <div>
        <p style = {{marginBottom: "5px"}}>Прогресс выполнения</p>
        <p className={styles.DailyTasksAbout}>Вы можете поменять ежедневное задание 1 раз в день</p>
        </div>

        <DailyTasksWrapper dailytasks = {props.dailytasks}/>
        </div>
    );
};
