import { useState } from "react";
import "./App.css";
import MakeSortable from "./components/MakeSortable";

function App() {
  const array = [1, 2, 3, 4, 5];

  const [items, setItems] = useState(
    array.map((elem) => (
      <div
        style={{
          width: 300,
          height: 50,
          marginBottom: 50,
          background: "lightblue",
          color: "black",
          transform: `translate(0px, 0px)`,
          border: "1px solid black",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", height: "100%" }}>
          <div
            className="handler"
            style={{
              height: 50,
              width: 50,
              border: "1px solid blue",
              cursor: "grab",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              userSelect: "none",
            }}
          >
            {elem}
          </div>
        </div>
      </div>
    ))
  );

  return (
    <div>
      <p style={{ userSelect: "none" }}>Sortable Custom</p>

      <MakeSortable
        array={items}
        onSort={(items) => setItems(items)}
        isIndicator={true}
      >
        {items}
      </MakeSortable>
    </div>
  );
}

export default App;
