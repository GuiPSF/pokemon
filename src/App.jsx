import "./App.css";
import DataBase from "./components/DatBase";
import Guess from "./components/Guess";
import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

function App() {
  const [tela, setTela] = useState();
  return (
    <div id="main">
      {/* Provider: provide the context to all the components
          Value: variables to provide
      */}
      <AppContext.Provider value={{ tela, setTela }}>
        {!tela ? <DataBase /> : <Guess />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
