/* eslint-disable  */
import './App.css';

import axios from 'axios';

import { useState, useEffect } from 'react';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${process.env.NODE_ENV}&hash=${process.env.NODE_ENV}`;
      await axios
        .get(apiUrl)
        .then((response) => {
          const allResponse = response.data.data.results;
          console.log('allResponse', allResponse);
          setCharacters(allResponse);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);
  
  return (
    <div className="App">
      <header>
        <h1>Marvel</h1>
      </header>
      <section className="container-card">
        {characters.map((character) => (
          <div className="card" key={character.id}>
            <img
              className="card-img-top"
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={`${character.thumbnail.name}`}
            />
            <div className="card-body">
              <ul className="card-text">
                <li>
                  <h5>Name</h5>
                  {`${character.name}`}
                </li>
                <li>
                  <h5>Description</h5>
                  {`${character.description === '' ? 'Has no description' : character.description}`}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
