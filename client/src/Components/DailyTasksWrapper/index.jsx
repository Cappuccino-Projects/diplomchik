import { DailyTaskCard } from "@components/DailyTaskCard";
import styles from "./styles.module.css";

export const DailyTasksWrapper = (props) => {
  return (
    <div style={{ marginBottom: "30px" }} className={styles.CardsWrapper}>
      {props.dailytasks?.map((CurrentTask) => (
        <DailyTaskCard key={CurrentTask.TaskId} task={CurrentTask} />
      ))}
    </div>
  );
};

