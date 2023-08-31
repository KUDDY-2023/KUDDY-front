import { useState } from "react";

// 배열과 해당 배열을 조작하는 함수들의 타입 정의
interface ArrayStateActions<T> {
  addItem: (item: T) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, newItem: T) => void;
  clearArray: () => void;
}

// T : 배열 요소의 타입
function useArrayState<T>(initialValue: T[] = []): [T[], ArrayStateActions<T>] {
  const [array, setArray] = useState(initialValue);

  const addItem = (item: T) => {
    setArray([...array, item]);
  };

  const removeItem = (index: number) => {
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
  };

  const updateItem = (index: number, newItem: T) => {
    const newArray = array.map((item, i) => (i === index ? newItem : item));
    setArray(newArray);
  };

  const clearArray = () => {
    setArray([]);
  };

  const actions: ArrayStateActions<T> = {
    addItem,
    removeItem,
    updateItem,
    clearArray,
  };

  return [array, actions];
}

export default useArrayState;
