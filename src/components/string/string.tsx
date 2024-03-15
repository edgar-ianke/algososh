import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

export const StringComponent: React.FC = () => {
  const [locked, setLocked] = React.useState(false);
  const [string, setString] = React.useState<string[]>([]);
  const [circleStates, setCircleStates] = React.useState<ElementStates[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value.split(""));
    setCircleStates(new Array(e.target.value.length).fill(ElementStates.Default));
  };

  function swap(arr: string[], firstIndex: number, secondIndex: number) {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }

  const changeColor = (color: ElementStates, firstIndex: number, secondIndex: number) => {
    setCircleStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[firstIndex] = color;
      updatedStates[secondIndex] = color;
      return updatedStates;
    });
  };

  const handleClick = async () => {
    setLocked(true);
    setCircleStates(circleStates.fill(ElementStates.Default));
    let res = string;
    let end = string.length - 1;
    let start = 0;
    while (start <= end) {
      changeColor(ElementStates.Changing, start, end);
      swap(res, start, end);
      await delay(DELAY_IN_MS);
      changeColor(ElementStates.Modified, start, end);
      setString([...res]);
      start++;
      end--;
    }
    setLocked(false);
  };
  return (
    <SolutionLayout title="Строка">
      <div className={styles.input}>
        <Input
          placeholder="Введите текст"
          value={string.join("")}
          onChange={onChange}
          maxLength={11}
          isLimitText={true}
        />
        <Button
          data-testid="button"
          text="Развернуть"
          onClick={handleClick}
          isLoader={locked}
          disabled={string.length > 0 && !locked ? false : true}
        />
      </div>
      <ul className={styles.circleContainer} data-testid="circle-list">
        {string.map((letter, i) => {
          return <Circle letter={letter} key={i} state={circleStates[i]} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
