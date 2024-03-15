import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";

interface SortingPageProps {
  array?: number[] | null; // Определите тип пропса, если он должен быть необязательным
}

export const SortingPage: React.FC<SortingPageProps> = ({ array = null }) => {
  const [arr, setArr] = React.useState<number[]>([]);
  const [columnStates, setColumnStates] = React.useState<ElementStates[]>([]);
  const [isLocked, setLocked] = React.useState(false);
  const [selectedRadio, setSelectedRadio] = React.useState("selection");
  const [loader, setLoader] = React.useState("");
  const handleRadioChange = (value: string) => {
    setSelectedRadio(value);
  };

  const generateArr = () => {
    const size = Math.floor(Math.random() * 15 + 3);
    const arr: number[] = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 100 + 1));
    }
    setArr([...arr]);
    setColumnStates(new Array(size).fill(ElementStates.Default));
  };
  function swap(arr: number[], firstIndex: number, secondIndex: number) {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    setArr([...arr!]);
  }

  React.useEffect(() => {
    array ? setArr(array) : generateArr();
  }, []);

  const bubbleSort = async (direction: Direction) => {
    setLocked(true);
    let colors = columnStates;
    colors.fill(ElementStates.Default);
    setColumnStates([...colors]);
    const n = arr!.length;
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        if (direction === Direction.Ascending) {
          colors[j] = ElementStates.Changing;
          colors[j + 1] = ElementStates.Changing;
          setColumnStates([...colors]);
          await delay(DELAY_IN_MS);
          if (arr![j] > arr![j + 1]) {
            swap(arr!, j, j + 1);
            swapped = true;
            colors[j] = ElementStates.Default;
            colors[j + 1] = ElementStates.Changing;
            setColumnStates([...colors]);
            if (n - i - j - 2 === 0) {
              colors[j + 1] = ElementStates.Modified;
              setColumnStates([...colors]);
            }
          }
          colors[j] = ElementStates.Default;
          colors[j + 1] = ElementStates.Modified;
          setColumnStates([...colors]);
        } else {
          colors[j] = ElementStates.Changing;
          colors[j + 1] = ElementStates.Changing;
          setColumnStates([...colors]);
          await delay(DELAY_IN_MS);
          if (arr![j] < arr![j + 1]) {
            swap(arr!, j, j + 1);
            swapped = true;
            colors[j] = ElementStates.Default;
            colors[j + 1] = ElementStates.Changing;
            setColumnStates([...colors]);
            if (n - i - j - 2 === 0) {
              colors[j + 1] = ElementStates.Modified;
              setColumnStates([...colors]);
            }
          }
          colors[j] = ElementStates.Default;
          colors[j + 1] = ElementStates.Modified;
          setColumnStates([...colors]);
        }
      }
      if (!swapped) {
        break;
      }
    }
    colors.fill(ElementStates.Modified);
    setColumnStates([...colors]);
    setLocked(false);
    setLoader("");
  };

  const selectionSort = async (direction: Direction) => {
    setLocked(true);
    const colors = columnStates;
    colors.fill(ElementStates.Default);
    setColumnStates([...colors]);
    const { length } = arr;
    if (direction === Direction.Ascending) {
      for (let i = 0; i < length - 1; i++) {
        let minInd = i;
        colors[i] = ElementStates.Changing;
        setColumnStates([...colors]);
        for (let j = i + 1; j < length; j++) {
          colors[j] = ElementStates.Changing;
          setColumnStates([...colors]);
          await delay(DELAY_IN_MS);
          if (arr[j] < arr[minInd]) {
            minInd = j;
          }
          colors[j] = ElementStates.Default;
          setColumnStates([...colors]);
        }

        swap(arr, minInd, i);
        colors[i] = ElementStates.Modified;
        setColumnStates([...colors]);
      }
    } else {
      for (let i = 0; i < length - 1; i++) {
        let minInd = i;
        colors[i] = ElementStates.Changing;
        setColumnStates([...colors]);
        for (let j = i + 1; j < length; j++) {
          colors[j] = ElementStates.Changing;
          setColumnStates([...colors]);
          await delay(DELAY_IN_MS);
          if (arr[j] > arr[minInd]) {
            minInd = j;
          }
          colors[j] = ElementStates.Default;
          setColumnStates([...colors]);
        }

        swap(arr, minInd, i);
        colors[i] = ElementStates.Modified;
        setColumnStates([...colors]);
      }
    }
    colors.fill(ElementStates.Modified);
    setColumnStates([...colors]);
    setLocked(false);
    setLoader("");
  };

  const handleSort = (direction: Direction) => {
    direction === Direction.Ascending ? setLoader(Direction.Ascending) : setLoader(Direction.Descending);
    if (selectedRadio === "selection") {
      selectionSort(direction);
    } else {
      bubbleSort(direction);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main}>
        <RadioInput
          label={"Выбор"}
          name="choice"
          extraClass={styles.radio1}
          checked={selectedRadio === "selection"}
          onChange={() => handleRadioChange("selection")}
        />
        <RadioInput
          label={"Пузырек"}
          name="choice"
          checked={selectedRadio === "bubble"}
          onChange={() => handleRadioChange("bubble")}
        />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={styles.button1}
          disabled={isLocked}
          isLoader={loader === Direction.Ascending ? true : false}
          onClick={() => {
            if (arr.length > 0) {
              handleSort(Direction.Ascending);
            }
          }}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          isLoader={loader === Direction.Descending ? true : false}
          onClick={() => {
            if (arr.length > 0) {
              handleSort(Direction.Descending);
            }
          }}
          disabled={isLocked}
        />
        <Button text="Новый массив" extraClass={styles.newArr} onClick={generateArr} disabled={isLocked} />
      </div>
      <ul className={styles.columns} data-testid="array">
        {arr?.map((item, i) => {
          return <Column index={item} extraClass={styles.column} state={columnStates[i]} key={i}/>;
        })}
      </ul>
    </SolutionLayout>
  );
};
