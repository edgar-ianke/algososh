import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [string, setString] = React.useState<string[]>([]);
  const [circleStates, setCircleStates] = React.useState<ElementStates[]>([]);
  const [isLocked, setLocked] = React.useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value.split(""));
    setCircleStates(new Array(e.target.value.length).fill(ElementStates.Default));
  };

  function swap(arr: string[], firstIndex: number, secondIndex: number) {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }

  const changeColor = (color: ElementStates , firstIndex: number, secondIndex:number) => {
  setCircleStates(prevStates => {
        const updatedStates = [...prevStates];
        updatedStates[firstIndex] = color
        updatedStates[secondIndex] = color
        return updatedStates;
      });
}

  const handleClick = async () => {
    setCircleStates(circleStates.fill(ElementStates.Default));
    setLocked(true);
    let res = string;
    let end = string.length - 1;
    let start = 0;
    while (start <= end) {
      swap(res, start, end);
      changeColor(ElementStates.Changing, start, end)
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
      changeColor(ElementStates.Modified, start, end)
      setString([...res]);
      start++;
      end--;
    }
    setLocked(false);
  };
  return (
    <SolutionLayout title="Строка">
      <div className={styles.input}>
        <Input placeholder="Введите текст" value={string.join("")} onChange={onChange} maxLength={11} isLimitText={true}/>
        <Button text="Развернуть" onClick={handleClick} disabled={isLocked} />
      </div>
      <ul className={styles.circleContainer}>
        {string.map((letter, i) => {
          return <Circle letter={letter} key={i} state={circleStates[i]} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
