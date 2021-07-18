import React, { useState } from 'react';
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import useCharacterData from './useCharacterData';

function App() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CharacterList />
      </React.Suspense>
    </RecoilRoot>
  );
}

const characterListState = atom({
  key: 'characterListState',
  default: [],
});

function CharacterList() {
    return (
      <div style={{margin: "20px"}}>
        <CharacterListInput />
        <CharacterListItems />
      </div>
    )
}

function CharacterListInput() {
  const [inputValue, setInputValue] = useState('');
  const setCharacterList = useSetRecoilState<any>(characterListState);
  const characters = useCharacterData({id:inputValue});

  const textChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addCharacter = () => {
    setCharacterList((oldCharacterList: any[]) => [...oldCharacterList, { id: getId(), text: inputValue }]);
    setInputValue('');
  };

  return(
    <>
      <input onChange={textChanged} value={inputValue} /> 
      <button onClick={addCharacter}>Add</button>
      <ul>
          {characters.map((char: any) => (
            <li key={char.name}>{char.name}</li>
          ))}
      </ul>
    </>
  )
}

function CharacterListItems() {
  const characterList = useRecoilValue(characterListState);

  return(
    <ul>
      {characterList.map((character: any) => (
        <Character key={character.name} character={character} />
      ))}
    </ul>
  )
}

function Character({character} : any) {
  const [characterList, setCharacterList] = useRecoilState<any>(characterListState);
  const index = characterList.findIndex((listItem: any) => listItem === character);

  const deleteItem = () => {
    const newList = removeItemAtIndex(characterList, index);
    setCharacterList(newList);
  };

  return(
    <li>
      {character.text}
      <button onClick={deleteItem} >X</button>
    </li>
  )
}

// function replaceItemAtIndex(arr: [], index: number, newValue : any) {
//   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
// }

function removeItemAtIndex(arr: [], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

let id = 0;
function getId() {
  return id++;
}


export default App;