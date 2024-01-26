import { useState } from "react";

const Box = ({
  id,
  array,
  index,
  setArray,
}: {
  id: number;
  array: number[];
  index: number;
  setArray: (array: number[]) => void;
}) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  let startPosition = { x: 0, y: 0 };
  const handleMouseDown = (e: React.MouseEvent) => {
    startPosition = { x: e.clientX, y: e.clientY };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setTranslate({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  };

  const handleMouseUp = (e: MouseEvent) => {
    console.log(Math.abs(startPosition.y - e.clientY) / 100);
    // if (
    //   Math.ceil(Math.abs(startPosition.y - e.clientY) / 100) > index ||
    //   (startPosition.y - e.clientY < 0 &&
    //     Math.floor(Math.abs(startPosition.y - e.clientY) / 100) + index >=
    //       array.length - 1)
    // ) {

    // document.getElementById("box")?.childNodes.forEach((element) => {
    //   if (element?.id !== id && document.getElementById(element?.id)?.getBoundingClientRect().y - startPosition)
    // });

    const tempArr = [...array];
    const elem = tempArr.splice(index, 1);
    startPosition.y - e.clientY < 0
      ? tempArr.splice(
          index +
            Math.max(Math.floor(Math.abs(startPosition.y - e.clientY) / 100)),
          0,
          elem[0]
        )
      : tempArr.splice(
          index -
            Math.min(
              Math.floor(Math.abs(startPosition.y - e.clientY) / 100),
              index
            ),
          0,
          elem[0]
        );
    setArray(tempArr);
    // }
    setTranslate({ x: 0, y: 0 });
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      id={id.toString()}
      style={{
        width: 300,
        height: 70,
        marginBottom: 30,
        background: "lightblue",
        transform: `translate(${translate.x}px, ${translate.y}px)`,
        border: "1px solid black",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div
          style={{ height: 70, width: 30, border: "1px solid blue" }}
          onMouseDown={handleMouseDown}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {id}
        </div>
      </div>
    </div>
  );
};

export default Box;
