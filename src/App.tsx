import { useEffect, useState } from "react";
import "./App.css";
import MakeSortable from "./components/MakeSortable";
import TakeSortable from "./components/TakeSortable";

function App() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [indicatorPosition, setIndicatorPosition] = useState({ x: 0, y: 0 });
  const [isDone, setIsDone] = useState(false);

  const [items, setItems] = useState([
    <div
      // id={"1"}
      style={{
        width: 300,
        height: 50,
        marginBottom: 50,
        background: "lightblue",
        color: "black",
        // transform: `translate(${translate.x}px, ${translate.y}px)`,
        transform: `translate(0px, 0px)`,
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div
          // id={"1" + "-handler"}
          className="handler"
          style={{
            height: 50,
            width: 50,
            border: "1px solid blue",
            cursor: "grab",
          }}
          // onMouseDown={handleMouseDown}
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
          1
        </div>
      </div>
    </div>,
    <div
      // id={"2"}
      style={{
        width: 300,
        height: 50,
        marginBottom: 50,
        background: "lightblue",
        color: "black",
        // transform: `translate(${translate.x}px, ${translate.y}px)`,
        transform: `translate(0px, 0px)`,
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div
          // id={"2" + "-handler"}
          className="handler"
          style={{
            height: 50,
            width: 50,
            border: "1px solid blue",
            cursor: "grab",
          }}
          // onMouseDown={handleMouseDown}
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
          2
        </div>
      </div>
    </div>,
    <div
      // id={"3"}
      style={{
        width: 300,
        height: 50,
        marginBottom: 50,
        background: "lightblue",
        color: "black",
        // transform: `translate(${translate.x}px, ${translate.y}px)`,
        transform: `translate(0px, 0px)`,
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div
          // id={"3" + "-handler"}
          className="handler"
          style={{
            height: 50,
            width: 50,
            border: "1px solid blue",
            cursor: "grab",
          }}
          // onMouseDown={handleMouseDown}
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
          3
        </div>
      </div>
    </div>,
    <div
      // id={"4"}
      style={{
        width: 300,
        height: 50,
        marginBottom: 50,
        background: "lightblue",
        color: "black",
        // transform: `translate(${translate.x}px, ${translate.y}px)`,
        transform: `translate(0px, 0px)`,
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div
          // id={"4" + "-handler"}
          className="handler"
          style={{
            height: 50,
            width: 50,
            border: "1px solid blue",
            cursor: "grab",
          }}
          // onMouseDown={handleMouseDown}
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
          4
        </div>
      </div>
    </div>,
    <div
      // id={"5"}
      style={{
        width: 300,
        height: 50,
        marginBottom: 50,
        background: "lightblue",
        color: "black",
        // transform: `translate(${translate.x}px, ${translate.y}px)`,
        transform: `translate(0px, 0px)`,
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div
          // id={"5" + "-handler"}
          className="handler"
          style={{
            height: 50,
            width: 50,
            border: "1px solid blue",
            cursor: "grab",
          }}
          // onMouseDown={handleMouseDown}
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
          5
        </div>
      </div>
    </div>,
  ]);

  // useEffect(() => {
  //   setItems(
  //     array.map((id) => (
  //       <div
  //         id={id.toString()}
  //         style={{
  //           width: 300,
  //           height: 50,
  //           marginBottom: 50,
  //           background: "lightblue",
  //           color: "black",
  //           // transform: `translate(${translate.x}px, ${translate.y}px)`,
  //           transform: `translate(0px, 0px)`,
  //           border: "1px solid black",
  //           position: "relative",
  //         }}
  //       >
  //         <div style={{ display: "flex", height: "100%" }}>
  //           <div
  //             id={id.toString() + "-handler"}
  //             className="handler"
  //             style={{
  //               height: 50,
  //               width: 50,
  //               border: "1px solid blue",
  //               cursor: "grab",
  //             }}
  //             // onMouseDown={handleMouseDown}
  //           ></div>
  //           <div
  //             style={{
  //               display: "flex",
  //               justifyContent: "center",
  //               alignItems: "center",
  //               height: "100%",
  //               width: "100%",
  //               userSelect: "none",
  //             }}
  //           >
  //             {id}
  //           </div>
  //         </div>
  //       </div>
  //     ))
  //   );
  // }, [array]);

  return (
    <div>
      <p style={{ userSelect: "none" }}>Sortable Custom</p>
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

      {/* {items.length && ( */}
      <TakeSortable
        translate={translate}
        setTranslate={setTranslate}
        array={items}
        indicatorPosition={indicatorPosition}
        setIndicatorPosition={setIndicatorPosition}
        onSort={(items) => setItems(items)}
      >
        {items}
      </TakeSortable>
      {/* )} */}
    </div>
  );
}

export default App;
