import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "../../utils/stack";

export const StackPage: React.FC = () => {
  const [stack, setStack] = React.useState(new Stack<string>());
  const [value, setValue] = React.useState("");
  const [color, setColor] = React.useState(false);
  const [loader, setLoader] = React.useState({ add: false, delete: false });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const enqueue = async () => {
    setLoader({ ...loader, add: true });
    setColor(true);
    stack.push(value);
    setStack(stack);
    setValue("");
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setColor(false);
    setLoader({ ...loader, add: false });
  };
  const dequeue = async () => {
    setLoader({ ...loader, delete: true });
    setColor(true);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    stack.pop();
    setStack(stack);
    setColor(false);
    setLoader({ ...loader, delete: false });
  };
  const reset = () => {
    setStack(new Stack<string>());
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.main}>
        <Input placeholder="Введите значение" value={value} onChange={onChange} maxLength={4} isLimitText={true} />
        <Button text="Добавить" disabled={value.length > 0 ? false : true} onClick={enqueue} isLoader={loader.add} />
        <Button text="Удалить" disabled={stack.getData().length > 0 ? false : true} onClick={dequeue} isLoader={loader.delete} />
        <Button
          text="Очистить"
          disabled={stack.getData().length > 0 ? false : true}
          onClick={reset}
          extraClass={styles.resetButton}
        />
      </div>
      <ul className={styles.circleContainer}>
        {stack.getData().map((letter, i) => {
          return (
            <Circle
              letter={letter}
              key={i}
              state={color && i === stack.getData().length - 1 ? ElementStates.Changing : ElementStates.Default}
              head={i === stack.getData().length - 1 ? "top" : null}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
