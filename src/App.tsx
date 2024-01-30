import { useState } from "react";
import "./App.css";
import MakeSortable from "./components/MakeSortable";
import Item from "./components/Item";

function App() {
  const [array, setArray] = useState([
    { id: "1", title: "GG", value: 2 },
    { id: "2", title: "PG", value: 5 },
    { id: "3", title: "GP", value: 1 },
    { id: "4", title: "RG", value: 9 },
    { id: "5", title: "GR", value: 8 },
  ]);

  return (
    <div>
      <p style={{ userSelect: "none" }}>Sortable Custom</p>

      <MakeSortable
        array={array}
        onSort={(items) => setArray(items)}
        isIndicator={true}
      >
        {array.map((item) => {
          return <Item item={item} />;
        })}
      </MakeSortable>
    </div>
  );
}

export default App;
