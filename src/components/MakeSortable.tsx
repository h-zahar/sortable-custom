import { ReactElement, useEffect, useState } from "react";

const MakeSortable = ({
  array,
  onSort,
  isIndicator = true,
  children,
}: {
  array: ReactElement[];
  onSort: (array: ReactElement[]) => void;
  isIndicator?: boolean;
  children: ReactElement[];
}) => {
  const [indicatorPosition, setIndicatorPosition] = useState({ x: 0, y: 0 });

  const doesHandlerExist = [...document.getElementsByClassName("handler")]
    .length;

  const doesContainerExist = document.getElementById("box");

  useEffect(
    () => {
      [...document.getElementsByClassName("handler")].forEach((elem) =>
        (elem as HTMLDivElement).addEventListener("mousedown", handleMouseDown)
      );
      document.getElementById("box") &&
        [...document.getElementById("box")!.children].map((elem, i) =>
          elem.setAttribute("index", i + "")
        );
    },
    // eslint-disable-next-line
    [children, doesHandlerExist, doesContainerExist]
  );

  if (!children.length) return <></>;

  let currentElement = null;
  let index = -1;
  let startPosition = { x: 0, y: 0 };

  const handleMouseDown = (e: MouseEvent) => {
    startPosition = { x: e.clientX, y: e.clientY };

    currentElement = (e.currentTarget! as HTMLDivElement)!.parentNode
      ?.parentNode;

    index = Number(
      ((e.currentTarget! as HTMLDivElement)!.parentNode
        ?.parentNode as HTMLDivElement)!.getAttribute("index")
    );

    (currentElement as HTMLDivElement)!.style.zIndex = "100";
    (currentElement as HTMLDivElement)!.style.opacity = "0.6";

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    currentElement!.style.opacity = "0.6";
    currentElement!.style.transform = `translate(${
      e.clientX - startPosition.x
    }px, ${e.clientY - startPosition.y}px)`;

    Math.floor(Math.abs(startPosition.y - e.clientY) / 100) === 0 &&
      (document.getElementById("indicator")!.style.display! = "none");

    if (Math.floor(Math.abs(startPosition.y - e.clientY) / 100) !== 0) {
      isIndicator &&
        setTimeout(
          () =>
            (document.getElementById("indicator")!.style.display! = "block"),
          10
        );
      isIndicator &&
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
                          Math.floor(
                            Math.abs(startPosition.y - e.clientY) / 100
                          )
                        )
                    ]?.getBoundingClientRect().y
                ) + 75
              : Number(
                  document
                    .getElementById("box")
                    ?.children[
                      index -
                        Math.min(
                          Math.floor(
                            Math.abs(startPosition.y - e.clientY) / 100
                          ),
                          index
                        )
                    ]?.getBoundingClientRect().y
                ) - 25,
        });
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    setTimeout(
      () => (document.getElementById("indicator")!.style.display! = "none"),
      20
    );

    currentElement!.style.opacity = "1";

    currentElement!.style.transform = `translate(0px, 0px)`;

    currentElement!.style.zIndex = "0";

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
    onSort(tempArr);

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div>
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
      <div id="box">{children}</div>
    </div>
  );
};

export default MakeSortable;
