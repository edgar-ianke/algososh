import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [sequence, setSequence] = React.useState<string[]>([]);
  const [value, setValue] = React.useState("");
  const [isLocked, setLocked] = React.useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (+e.target.value <= 19) {
      setValue(e.target.value);
    }
  };

  const fibonacci = async (n: number) => {
    setLocked(true);
    let arr: string[] = [];
    let first = 0;
    let second = 1;
    arr.push("1");
    setSequence([...arr]);
    let res;
    let counter = 0;
    while (counter < n) {
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      if (counter === n - 1) {
        break
      }
      if (n === 1) {
        arr.push("1");
      } else {
        res = first + second;
        first = second;
        second = res;
        arr.push(res.toString());
      }
      counter++;
      setSequence([...arr]);
    }
    setLocked(false);
  };

  const handleClick = () => {
    fibonacci(parseInt(value));
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.input}>
        <Input
          placeholder="Введите число"
          value={value}
          onChange={onChange}
          max={19}
          type="number"
          isLimitText={true}
        />
        <Button text="Рассчитать" onClick={handleClick} disabled={isLocked} />
      </div>
      <ul className={styles.circleContainer}>
        {sequence.map((item, i) => {
          return (
            <div className={styles.circle} key={i}>
              <Circle letter={item} index={i} />
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
