import { ReactElement, useEffect, useRef, useState } from "react";
import { TSingleItem } from "../types/item";

const MakeSortable = ({
  array,
  onSort,
  isIndicator = true,
  children,
}: {
  array: TSingleItem[];
  onSort: (array: TSingleItem[]) => void;
  isIndicator?: boolean;
  children: ReactElement[];
}) => {
  const [indicatorPosition, setIndicatorPosition] = useState({ x: 0, y: 0 });

  let currentElement = null;
  let index = -1;
  let startPosition = { x: 0, y: 0 };
  let unitDistance = -1;
  let unitBoxDistance = -1;
  let unitGapDistance = -1;

  const handleMouseDown = (e: MouseEvent) => {
    startPosition = { x: e.clientX, y: e.clientY };

    index = Number(
      (e.currentTarget! as HTMLElement)!.getAttribute("data-index")
    );

    currentElement = [...boxRef.current!.children].find(
      (elem) => elem.getAttribute("data-index") === index.toString()
    );

    unitDistance =
      Number((currentElement as HTMLElement)!.getBoundingClientRect().height) +
      Number(
        boxRef.current!.children[1].getBoundingClientRect().y -
          (boxRef.current!.children[0].getBoundingClientRect().y +
            boxRef.current!.children[0].getBoundingClientRect().height)
      );
    unitBoxDistance = Number(
      (currentElement as HTMLElement)!.getBoundingClientRect().height
    );

    unitGapDistance = Number(
      boxRef.current!.children[1].getBoundingClientRect().y -
        (boxRef.current!.children[0].getBoundingClientRect().y +
          boxRef.current!.children[0].getBoundingClientRect().height)
    );

    (currentElement as HTMLElement)!.style.zIndex = "100";
    (currentElement as HTMLElement)!.style.opacity = "0.6";

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    currentElement!.style.opacity = "0.6";
    currentElement!.style.transform = `translate(${
      e.clientX - startPosition.x
    }px, ${e.clientY - startPosition.y}px)`;

    Math.floor(Math.abs(startPosition.y - e.clientY) / unitDistance) === 0 &&
      (document.getElementById("indicator")!.style.display! = "none");

    if (
      Math.floor(Math.abs(startPosition.y - e.clientY) / unitDistance) !== 0
    ) {
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
                  boxRef.current?.children[
                    index +
                      Math.max(
                        Math.floor(
                          Math.abs(startPosition.y - e.clientY) / unitDistance
                        )
                      ) <=
                    array.length - 1
                      ? index +
                        Math.max(
                          Math.floor(
                            Math.abs(startPosition.y - e.clientY) / unitDistance
                          )
                        )
                      : array.length - 1
                  ]?.getBoundingClientRect().y
                ) +
                unitBoxDistance +
                unitGapDistance / 2
              : Number(
                  boxRef.current?.children[
                    index -
                      Math.min(
                        Math.floor(
                          Math.abs(startPosition.y - e.clientY) / unitDistance
                        ),
                        index
                      )
                  ]?.getBoundingClientRect().y
                ) -
                unitGapDistance / 2,
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
            Math.max(
              Math.floor(Math.abs(startPosition.y - e.clientY) / unitDistance)
            ),
          0,
          elem[0]
        )
      : tempArr.splice(
          index -
            Math.min(
              Math.floor(Math.abs(startPosition.y - e.clientY) / unitDistance),
              index
            ),
          0,
          elem[0]
        );
    onSort(tempArr);

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(
    () => {
      [...document.getElementsByClassName("handler")].forEach((elem, i) => {
        elem.setAttribute("data-index", i + "");
        (elem as HTMLElement).addEventListener("mousedown", handleMouseDown);
      });
      boxRef.current &&
        [...boxRef.current!.children].map((elem, i) =>
          elem.setAttribute("data-index", i + "")
        );

      return () => {
        [...document.getElementsByClassName("handler")].forEach((elem) => {
          elem.removeAttribute("data-index");
          (elem as HTMLElement).removeEventListener(
            "mousedown",
            handleMouseDown
          );
        });
        boxRef!.current &&
          [...boxRef!.current!.children].map((elem) =>
            elem.removeAttribute("data-index")
          );
      };
    },
    // eslint-disable-next-line
    [children]
  );
  const boxRef = useRef<HTMLDivElement>(null);

  if (!children.length) return <></>;
  return (
    <div>
      <div
        id="indicator"
        className="styles-indicator"
        style={{
          top: indicatorPosition.y,
        }}
      ></div>
      <div ref={boxRef}>{children}</div>
    </div>
  );
};

export default MakeSortable;
