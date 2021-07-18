import { useState, useEffect } from 'react';
import axios from 'axios';

function useCharacterData({id}) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        const url = (id && id > 0) ? `https://swapi.dev/api/people/${id}/` : 'https://swapi.dev/api/people/';
        const result = await axios(url);
        if (id) {
          setCharacters([result.data]);
        } else {
          setCharacters(result.data.results);
        }
      };

      fetchData();
  }, [id]);

  return characters;
}

export default useCharacterData;