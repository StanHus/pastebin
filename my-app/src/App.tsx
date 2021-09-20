import React from 'react';
import { useEffect, useState } from "react";
import DigipetActions from "./components/DigipetActions";
import DigipetData from "./components/DigipetData";
import "./css/style.css"

export interface Digipet {
  happiness: number;
  nutrition: number;
  discipline: number;
}

function App() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [message, setMessage] = useState<string>();
  const [digipetStats, setDigipetStats] = useState<Digipet>();

  const loadDataFromEndpoint = async (endpoint: `/${string}`) => {
    // try... catch documentation:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    try {
      const res = await fetch(`https://tranquil-tundra-77719.herokuapp.com${endpoint}`);
      const body = await res.json();
      setMessage(body.message);
      setDigipetStats(body.digipet);
    } catch (err) {
      console.log(err);
      setMessage(`${err.name}: ${err.message}`);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // safe to ignore exhaustive deps warning as we're _not_ triggering infinite updates, since our setState is conditional and not executed on all rerenders after the first one
    if (isFirstLoad) {
      // populate data on first load
      loadDataFromEndpoint("/digipet");
      setIsFirstLoad(false);
    }
  });

  return (
    <main>
      <h1>Digipet 1.0</h1>
      {isFirstLoad && <p>Loading...</p>}
      {message && <h2>{message}</h2>}
      <hr />
        <div className = "stats"><DigipetData digipet={digipetStats} /> </div>
      <hr />
      <div className = "actions">
        <DigipetActions 
         actions={[
          {
            name: "Hatch",
            handler: () => loadDataFromEndpoint("/digipet/hatch"),
          },
          {
            name: "Walk",
            handler: () => loadDataFromEndpoint("/digipet/walk"),
          },
          { name: "Feed",
            handler: () => loadDataFromEndpoint("/digipet/feed"),
          },
          { name: "Train",
            handler: () => loadDataFromEndpoint("/digipet/train"),
          },  
          { name: "Ignore",
            handler: () => loadDataFromEndpoint("/digipet/ignore"),
          },
          { name: "Rehome",
            handler: () => loadDataFromEndpoint("/digipet/rehome"),
          },
        ]}
        />

        </div>
    </main>
  );
}

export default App;
