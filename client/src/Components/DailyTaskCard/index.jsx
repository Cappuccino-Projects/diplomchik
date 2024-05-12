import styles from "./styles.module.css";

export const DailyTaskCard = (props) => {

  const  IconBackColor = props.task.TaskBackgroundColor;

  return (
    <div className={styles.Card}>
      <div className={styles.DailyTaskTitleWrapper}>
        <div className={styles.DailyTaskTitle}>
          <div className={styles.DailyTaskIcon}>
            <img
              src={"../img/" + props.task.TaskImage}
              className={styles.DailyTaskImg}
            />
          </div>
          {/* Нету класса DailyTaskName */}
          <p className="DailyTaskName">{props.task.TaskName}</p>
        </div>

        {!props.task.TaskIsCompleted && (
          <div className={styles.DailyTaskButton}>
            <i className="fi fi-sr-refresh" />
          </div>
        )}
      </div>
      <div className={styles.DailyTaskInfoStatusWrapper}>
        <p>{props.task.TaskText}</p>
        <div
          style={{
            backgroundColor: props.task.TaskIsCompleted
              ? "#CAF05F"
              : "#EDEDED",
          }}
          className={styles.DailyTaskStatus}
        >
          {props.task.TaskProgress}
        </div>
      </div>
    </div>
  );
};
export default DailyTaskCard;
