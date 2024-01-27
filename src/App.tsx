import { useState } from "react";
import "./App.css";
import Box from "./components/Box";

function App() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const [indicatorPosition, setIndicatorPosition] = useState({ x: 0, y: 0 });

  return (
    <div>
      <p>Sortable Custom</p>
      <div
        id="indicator"
        style={{
          display: "none",
          position: "absolute",
          top: indicatorPosition.y,
          left: "calc(50% - 150px)",
          height: "5px",
          background: "blue",
          width: 300,
        }}
      ></div>
      <div id="box">
        {array.map((arr, i) => {
          return (
            <Box
              key={arr}
              id={arr}
              index={i}
              array={array}
              setArray={setArray}
              indicatorPosition={indicatorPosition}
              setIndicatorPosition={setIndicatorPosition}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
