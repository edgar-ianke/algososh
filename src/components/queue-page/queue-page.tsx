import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "../../utils/queue";
import { delay } from "../../utils/utils";

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = React.useState(new Queue<string>(7));
  const [value, setValue] = React.useState("");
  const [columnStates, setColumnStates] = React.useState<ElementStates[]>(new Array(7).fill(ElementStates.Default));
  const [loader, setLoader] = React.useState({ add: false, delete: false, reset: false });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const enqueue = async () => {
    setLoader({ ...loader, add: true });
    columnStates[queue.tail] = ElementStates.Changing;
    setColumnStates([...columnStates]);
    await delay(SHORT_DELAY_IN_MS);
    columnStates[queue.tail] = ElementStates.Default;
    setColumnStates([...columnStates]);
    queue.enqueue(value);
    setQueue(queue);
    setValue("");
    setLoader({ ...loader, add: false });
  };
  const dequeue = async () => {
    setLoader({ ...loader, delete: true });
    columnStates[queue.head] = ElementStates.Changing;
    setColumnStates([...columnStates]);
    await delay(SHORT_DELAY_IN_MS);
    columnStates[queue.head] = ElementStates.Default;
    setColumnStates([...columnStates]);
    queue.dequeue();
    setQueue(queue);
    setLoader({ ...loader, delete: false });
  };
  const reset = async () => {
    setLoader({ ...loader, reset: true });
    columnStates.fill(ElementStates.Changing);
    setColumnStates([...columnStates]);
    await delay(SHORT_DELAY_IN_MS);
    columnStates.fill(ElementStates.Default);
    setColumnStates([...columnStates]);
    queue.reset();
    setQueue(queue);
    setLoader({ ...loader, reset: false });
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.main}>
        <Input placeholder="Введите значение" value={value} onChange={onChange} maxLength={4} isLimitText={true} />
        <Button text="Добавить" onClick={enqueue} disabled={value.length > 0 ? false : true} isLoader={loader.add} />
        <Button text="Удалить" onClick={dequeue} disabled={queue.length > 0 ? false : true} isLoader={loader.delete} />
        <Button
          text="Очистить"
          extraClass={styles.resetButton}
          onClick={reset}
          isLoader={loader.reset}
          disabled={queue.length > 0 ? false : true}
        />
      </div>
      <ul className={styles.circleContainer}>
        {queue.getData().map((letter, i) => {
          return (
            <Circle
              letter={letter}
              key={i}
              head={i === queue.head && queue.length > 0 ? "head" : null}
              tail={
                (i + 1 === queue.tail && queue.length > 0) ||
                (letter !== "" && queue.tail === 0 && i === queue.size - 1)
                  ? "tail"
                  : null
              }
              state={columnStates[i]}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
