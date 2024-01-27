import { useState } from "react";

const Box = ({
  id,
  array,
  index,
  setArray,
  indicatorPosition,
  setIndicatorPosition,
}: {
  id: number;
  array: number[];
  index: number;
  setArray: (array: number[]) => void;
  indicatorPosition: { x: number; y: number };
  setIndicatorPosition: (indicatorPosition: { x: number; y: number }) => void;
}) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  let startPosition = { x: 0, y: 0 };
  const handleMouseDown = (e: React.MouseEvent) => {
    startPosition = { x: e.clientX, y: e.clientY };

    document.getElementById(id.toString()).style.zIndex = 100;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setTranslate({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
    console.log(
      index + Math.max(Math.floor(Math.abs(startPosition.y - e.clientY) / 100))
    );
    Math.floor(Math.abs(startPosition.y - e.clientY) / 100) === 0 &&
      (document.getElementById("indicator")!.style.display! = "none");

    if (Math.floor(Math.abs(startPosition.y - e.clientY) / 100) !== 0) {
      setTimeout(
        () => (document.getElementById("indicator")!.style.display! = "block"),
        100
      );
      setIndicatorPosition({
        x: indicatorPosition.x,
        y:
          startPosition.y - e.clientY < 0
            ? Number(
                document
                  .getElementById("box")
                  ?.children[
                    index +
                      Math.max(
                        Math.floor(Math.abs(startPosition.y - e.clientY) / 100)
                      )
                  ]?.getBoundingClientRect().y
              ) + 75
            : Number(
                document
                  .getElementById("box")
                  ?.children[
                    index -
                      Math.min(
                        Math.floor(Math.abs(startPosition.y - e.clientY) / 100),
                        index
                      )
                  ]?.getBoundingClientRect().y
              ) - 25,
      });
    }
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

    document.getElementById(id.toString()).style.zIndex = 0;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      id={id.toString()}
      style={{
        width: 300,
        height: 50,
        marginBottom: 50,
        background: "lightblue",
        color: "black",
        transform: `translate(${translate.x}px, ${translate.y}px)`,
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div
          style={{
            height: 50,
            width: 50,
            border: "1px solid blue",
            cursor: "grab",
          }}
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
