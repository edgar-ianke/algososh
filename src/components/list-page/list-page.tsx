import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "../../utils/linked-list";
import { mockedList, mockedListSize } from "../../constants/mocked-list";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const ListPage: React.FC = () => {
  const [list] = React.useState(new LinkedList<string>(mockedList, mockedListSize));
  const [data, setData] = React.useState<string[]>(list.showValues());
  const [value, setValue] = React.useState<string>("");
  const [index, setIndex] = React.useState("");
  const [loader, setLoader] = React.useState({
    addHead: false,
    addTail: false,
    deleteHead: false,
    deleteTail: false,
    addIndex: false,
    deleteIndex: false,
  });
  const [highlightIndex, setHighlightIndex] = React.useState<{ index: number[]; color: null | string }>({
    index: [],
    color: null,
  });
  const [head, setHead] = React.useState<Record<number, { value: string | React.ReactElement }>>({
    0: { value: "head" },
  });
  const [tail, setTail] = React.useState<Record<number, { value: string | React.ReactElement }>>({
    [data.length - 1]: { value: "tail" },
  });
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value);
  };
  const append = async () => {
    setLoader({ ...loader, addTail: true });
    setHead({
      ...head,
      [data.length - 1]: { value: <Circle letter={value} isSmall={true} state={ElementStates.Changing} /> },
    });
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setHead({ 0: { value: "head" } });
    setTail({ [data.length]: { value: "tail" } });
    list.append(value);
    setData(list.showValues());
    setValue("");
    setHighlightIndex({ index: [data.length], color: ElementStates.Modified });
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setHighlightIndex({ index: [], color: null });
    setLoader({ ...loader, addTail: false });
  };
  const prepend = async () => {
    setLoader({ ...loader, addHead: true });
    setHead({
      0: { value: <Circle letter={value} isSmall={true} state={ElementStates.Changing} /> },
    });
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setHead({
      0: { value: "head" },
    });
    setTail({ [data.length]: { value: "tail" } });
    list.insertAt(value, 0);
    setData(list.showValues());
    setValue("");
    setHighlightIndex({ index: [0], color: ElementStates.Modified });
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setHighlightIndex({ index: [], color: null });
    setLoader({ ...loader, addHead: false });
  };
  const deleteFirst = async () => {
    setLoader({ ...loader, deleteHead: true });
    setTail({ ...tail, [0]: { value: <Circle letter={data[0]} isSmall={true} state={ElementStates.Changing} /> } });
    data[0] = "";
    setData([...data]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    list.deleteAt(0);
    setData(list.showValues());
    setTail({ [list.getSize() - 1]: { value: "tail" } });
    setLoader({ ...loader, deleteHead: false });
  };
  const deleteLast = async () => {
    setLoader({ ...loader, deleteTail: true });
    setTail({
      [list.getSize() - 1]: {
        value: <Circle letter={data[list.getSize() - 1]} isSmall={true} state={ElementStates.Changing} />,
      },
    });
    data[data.length - 1] = "";
    setData([...data]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    list.deleteAt(list.getSize() - 1);
    setData(list.showValues());
    setTail({ [list.getSize() - 1]: { value: "tail" } });
    setLoader({ ...loader, deleteTail: false });
  };
  const insertAt = async () => {
    setLoader({ ...loader, addIndex: true });
    if (index !== "" && +index < list.getSize()) {
      let i = -1;
      for (i; i < parseInt(index); i++) {
        setHead({
          ...head,
          [i + 1]: { value: <Circle letter={value} isSmall={true} state={ElementStates.Changing} /> },
        });
        setHighlightIndex((prevState) => ({
          index: [...prevState.index, i + 1],
          color: ElementStates.Changing,
        }));
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      }
      setHead({
        0: { value: "head" },
      });
      list.insertAt(value, parseInt(index));
      setData(list.showValues());
      setValue("");
      setHighlightIndex({ index: [i], color: ElementStates.Modified });
      setTail({ [list.getSize() - 1]: { value: "tail" } });
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setHighlightIndex({ index: [], color: null });
      setIndex("");
      setLoader({ ...loader, addIndex: false });
    }
  };
  const deleteAt = async (ind: number) => {
    setLoader({ ...loader, deleteIndex: true });
    if (index !== "" && +index < list.getSize()) {
      let i = -1;
      for (i; i < parseInt(index); i++) {
        setHighlightIndex((prevState) => ({
          index: [...prevState.index, i + 1],
          color: ElementStates.Changing,
        }));
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      }
      setTail({ ...tail, [i]: { value: <Circle letter={data[i]} isSmall={true} state={ElementStates.Changing} /> } });
      data[i] = "";
      setData([...data]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setHighlightIndex({ index: [], color: null });
      list.deleteAt(ind);
      setData(list.showValues());
      setTail({
        [list.getSize() - 1]: { value: "tail" },
      });
      setIndex("");
    }
    setLoader({ ...loader, deleteIndex: false });
  };
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.main}>
        <div className={styles.firstRow}>
          <Input
            name="value"
            placeholder="Введите значение"
            value={value}
            onChange={onValueChange}
            maxLength={4}
            isLimitText={true}
          />
          <Button
            text="Добавить в head"
            onClick={prepend}
            disabled={value.length > 0 ? false : true}
            isLoader={loader.addHead}
          />
          <Button
            text="Добавить в tail"
            onClick={append}
            disabled={value.length > 0 ? false : true}
            isLoader={loader.addTail}
          />
          <Button
            text="Удалить из head"
            onClick={deleteFirst}
            disabled={data.length > 0 ? false : true}
            isLoader={loader.deleteHead}
          />
          <Button
            text="Удалить из tail"
            onClick={deleteLast}
            disabled={data.length > 0 ? false : true}
            isLoader={loader.deleteTail}
          />
        </div>
        <div className={styles.secondRow}>
          <Input
            name="index"
            placeholder="Введите индекс"
            value={index}
            type="number"
            onChange={onIndexChange}
            min={0}
            max={list.getSize() - 1}
          />
          <Button
            text="Добавить по индексу"
            onClick={insertAt}
            disabled={value.length > 0 && index.length > 0 ? false : true}
            isLoader={loader.addIndex}
          />
          <Button
            text="Удалить по индексу"
            onClick={() => deleteAt(parseInt(index))}
            disabled={index.length > 0 ? false : true}
            isLoader={loader.deleteIndex}
          />
        </div>
      </div>
      <ul className={styles.circleContainer}>
        {data.map((letter, i) => {
          return (
            <li key={i} className={styles.circle}>
              <Circle
                letter={letter}
                index={i}
                head={head.hasOwnProperty(i) ? head[i].value : null}
                tail={tail.hasOwnProperty(i) ? tail[i].value : null}
                state={
                  highlightIndex.index!.includes(i) ? (highlightIndex.color as ElementStates) : ElementStates.Default
                }
              />
              {i !== data.length - 1 ? <ArrowIcon /> : null}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
