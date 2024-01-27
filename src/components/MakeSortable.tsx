import { useState } from "react";
import Box from "./Box";

const MakeSortable = ({
  items,
  setItems,
}: {
  items: number[];
  setItems: (items: number[]) => void;
}) => {
  const [indicatorPosition, setIndicatorPosition] = useState({ x: 0, y: 0 });
  return (
    <>
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
        {items.map((arr, i) => {
          return (
            <Box
              key={arr}
              id={arr}
              index={i}
              array={items}
              setArray={setItems}
              indicatorPosition={indicatorPosition}
              setIndicatorPosition={setIndicatorPosition}
            />
          );
        })}
      </div>
    </>
  );
};

export default MakeSortable;
