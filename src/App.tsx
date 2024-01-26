import { useState } from "react";
import "./App.css";
import Box from "./components/Box";

function App() {
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6]);

  return (
    <div>
      <p>Sortable Custom</p>
      <div id="box">
        {array.map((arr, i) => {
          return (
            <Box
              key={arr}
              id={arr}
              index={i}
              array={array}
              setArray={setArray}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
