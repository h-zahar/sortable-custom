import { useState } from "react";
import "./App.css";
import MakeSortable from "./components/MakeSortable";

function App() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  return (
    <div>
      <p style={{ userSelect: "none" }}>Sortable Custom</p>
      <MakeSortable items={array} setItems={setArray} />
    </div>
  );
}

export default App;
