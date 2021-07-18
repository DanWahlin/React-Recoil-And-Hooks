import React, { useState } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  ErrorBoundary
} from 'recoil';
import useCharacterData from './useCharacterData';

function App() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <TodoList />
      </React.Suspense>
    </RecoilRoot>
  );
}

const todoListState = atom({
  key: 'todoListState',
  default: [],
});

function TodoList() {
    return (
      <div style={{margin: "20px"}}>
        <TodoListInput />
        <TodoListItems />
      </div>
    )
}

function TodoListInput() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);
  const characters = useCharacterData({id:inputValue});

  const textChanged = ({target: {value}}) => {
    setInputValue(value);
  };

  const addTodoItem = () => {
    setTodoList((oldTodoList) => [...oldTodoList, { id: getId(), text: inputValue }]);
    setInputValue('');
  };

  return(
    <>
      <input onChange={textChanged} value={inputValue} /> 
      <button onClick={addTodoItem}>Add</button>
      <ul>
          {characters.map((char) => (
            <li key={char.name}>{char.name}</li>
          ))}
      </ul>
    </>
  )
}

function TodoListItems() {
  const todoList = useRecoilValue(todoListState);

  return(
    <ul>
      {todoList.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

function TodoItem({item}) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };

  return(
    <li>
      {item.text}
      <button onClick={deleteItem} >X</button>
    </li>
  )
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

let id = 0;
function getId() {
  return id++;
}


export default App;