import React from "react";
import "./App.css";
import axios from "axios";

import { useState, useEffect } from "react";

//https://gateway.marvel.com:443/v1/public/characters?apikey=07bbfc5eeb304502523769dd0cce48d4
//Public Key => 07bbfc5eeb304502523769dd0cce48d4
//Private Key => 396346de2cb7574f970dc8d49d00b9a53215484f
//ts:1
//1396346de2cb7574f970dc8d49d00b9a53215484f07bbfc5eeb304502523769dd0cce48d4
//hash => 26a894e6e8f292e966dc1258f7c14ae0

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const apiUrl =
        "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=07bbfc5eeb304502523769dd0cce48d4&hash=26a894e6e8f292e966dc1258f7c14ae0";
      await axios
        .get(apiUrl)
        .then((response) => {
          const allResponse = response.data.data.results;
          console.log("allResponse", allResponse);
          setCharacters(allResponse);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);
  console.log("Characters", characters);
  return (
    <>
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
              ></img>
              <div className="card-body">
                <ul className="card-text">
                  <li><h5>Name</h5>{`${character.name}`}</li>
                  <li><h5>Description</h5>{`${character.description===""? "Has no description": character.description}`}</li>
                </ul>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
