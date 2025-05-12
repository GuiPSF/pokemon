import "./dataBase.css";
import { useState, useContext } from "react";
import Axios from "axios";
import { AppContext } from "../../App";
import { getIconByName } from "../IconFinder";
//const icons = import.meta.glob('./src/assets/icons/pokemonTypes/*.png');

function DataBase() {
  const icon = getIconByName('ghost');
  const { tela, setTela } = useContext(AppContext);

  const [error, setError] = useState("")
  const [pokemon, setPokemon] = useState("");
  const [pokemonType1, setPokemonType1] = useState("");
  const [pokemonType2, setPokemonType2] = useState("");
  const [pokemonSprite, setPokemonSprite] = useState("");
  const [pokemonBackSprite, setPokemonBackSprite] = useState("");
  const [pokemonShinySprite, setPokemonShinySprite] = useState("");
  const [pokemonBackShinySprite, setPokemonShinyBackSprite] = useState("");
  const [pokemonHP, setPokemonHP] = useState("");
  const [pokemonATK, setPokemonATK] = useState("");
  const [pokemonSATK, setPokemonSATK] = useState("");
  const [pokemonDef, setPokemonDef] = useState("");
  const [pokemonSDef, setPokemonSDef] = useState("");
  const [pokemonSPD, setPokemonSPD] = useState("");
  const [screen, setScreen] = useState(false);

  const fetchPokemon = async () => {
    try {
      const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      setError("");
      setScreen(true);
      setPokemonSprite(res.data.sprites.front_default);
      setPokemonBackSprite(res.data.sprites.back_default);
      setPokemonShinySprite(res.data.sprites.front_shiny);
      setPokemonShinyBackSprite(res.data.sprites.back_shiny);
      setPokemonHP(res.data.stats[0].base_stat);
      setPokemonATK(res.data.stats[1].base_stat);
      setPokemonDef(res.data.stats[2].base_stat);
      setPokemonSATK(res.data.stats[3].base_stat);
      setPokemonSDef(res.data.stats[4].base_stat);
      setPokemonSPD(res.data.stats[5].base_stat);
      setPokemonType1(res.data.types[0].type.name);
      if (res.data.types[1]) {
        setPokemonType2(res.data.types[1].type.name);
      } else {
        setPokemonType2("");
      }
      console.log(res.data);
    } catch (e) {
      console.log("Pokémon not found");
      setError("Pokémon Not Found");
      setScreen(false);
      setPokemonSprite("");
      setPokemonBackSprite("");
      setPokemonShinySprite("");
      setPokemonShinyBackSprite("");
      setPokemonHP(0);
      setPokemonATK(0);
      setPokemonDef(0);
      setPokemonSATK(0);
      setPokemonSDef(0);
      setPokemonSPD(0);
      setPokemonType1("");
      setPokemonType2("");
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchPokemon();
    }
  };



  return (
    <div id="main">
      <header>
        <button className="link">Pokemon Data Base</button>
        <button
          className="link"
          href=""
          onClick={() => {
            setTela(true);
          }}
        >
          Guess the Pokemon
        </button>
      </header>
      <h1>Choose a Pokemon</h1>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onChange={(event) => setPokemon(event.target.value)}
      />
      <button onClick={fetchPokemon}>Show details</button>
      <div style={{color:"red"}}>{error}</div>
      {screen ? (
        <div id="content">
          <div id="images">
            <h2>Default Version</h2>
            <img src={pokemonSprite} alt="" />
            <img src={pokemonBackSprite} alt="" />
            <hr />
            <h2>Shiny Version</h2>
            <img src={pokemonShinySprite} alt="" />
            <img src={pokemonBackShinySprite} alt="" />
          </div>
          <div id="stats">
            <table>
              <tbody>
                <tr>
                  <th>Stats</th>
                </tr>

                <tr>
                  <td>Types:</td>
                  <td style={{display: "flex", gap: "0.5rem"}}><img src={getIconByName(pokemonType1)} alt="" /> {pokemonType1}</td>
                  <td style={{display: "flex", gap: "0.5rem"}}><img src={getIconByName(pokemonType2)} alt="" /> {pokemonType2}</td>
                </tr>

                <tr>
                  <td>Health</td>
                  <td>{pokemonHP}</td>
                </tr>

                <tr>
                  <td>Attack</td>
                  <td>{pokemonATK}</td>
                </tr>

                <tr>
                  <td>Defense</td>
                  <td>{pokemonDef}</td>
                </tr>

                <tr>
                  <td>Sp. Atk</td>
                  <td>{pokemonSATK}</td>
                </tr>

                <tr>
                  <td>Sp. Def</td>
                  <td>{pokemonSDef}</td>
                </tr>

                <tr>
                  <td>Speed</td>
                  <td>{pokemonSPD}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DataBase;
