import "./App.css";
import Box from "./components/Box";

function App() {
  const array = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <p>Sortable Custom</p>
      {array.map((arr) => {
        return <Box key={arr} id={arr} />;
      })}
    </div>
  );
}

export default App;
