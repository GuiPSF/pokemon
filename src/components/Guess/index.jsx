// Guess.jsx
import "./guess.css";
import { useState, useContext, useEffect, useRef } from "react";
import Axios from "axios";
import { AppContext } from "../../App";

const Guess = () => {
  const { setTela } = useContext(AppContext);
  const [image, setImage] = useState("");
  const [randomPokemon, setRandomPokemon] = useState("");
  const [points, setPoints] = useState(0);
  const [guessedPokemon, setGuessedPokemon] = useState("");
  const imgRef = useRef();
  const [id, setId] = useState(null);

  useEffect(() => {
    if (id !== null) fetchImage(id);
  }, [id]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchImage = (pokeId) => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then((res) => {
      setImage(res.data.sprites.front_default);
      setRandomPokemon(res.data.forms[0].name);
      console.log(res.data.forms[0].name);
      imgRef.current.style.filter = "brightness(0)";
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      validateResponse();
    }
  };

  const changeUI = async () => {
    imgRef.current.style.filter = "brightness(1)";
    await sleep(1000);
    imgRef.current.style.filter = "brightness(0)";
  };

  const validateResponse = async () => {
    if (guessedPokemon.toLowerCase() === randomPokemon.toLowerCase()) {
      console.log("acertou");
      setPoints((prev) => prev + 1);
    } else {
      console.log("errou");
    }

    await changeUI();

    const newId = Math.floor(Math.random() * 386) + 1;
    setId(newId);
    setGuessedPokemon("");
  };

  return (
    <div id="main-guess">
      <header>
        <button className="link" onClick={() => setTela(false)}>
          Pokemon Data Base
        </button>
        <button className="link">Guess the Pokemon</button>
      </header>

      <div id="content">
        {image !== "" ? (
          <>
            <img src={image} alt="Pokemon Silhouette" ref={imgRef} />
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                value={guessedPokemon}
                onKeyDown={handleKeyDown}
                onChange={(e) => setGuessedPokemon(e.target.value)}
                placeholder="Who's that Pokémon?"
              />
            </form>
          </>
        ) : (
          <button onClick={() => setId(Math.floor(Math.random() * 386) + 1)}>
            Generate Random Pokemon
          </button>
        )}
      </div>

      <h1>Points: {points}</h1>
    </div>
  );
};

export default Guess;
