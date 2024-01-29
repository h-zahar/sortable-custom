import { useEffect } from "react";

const TakeSortable = ({
  array,
  onSort,
  translate,
  setTranslate,
  indicatorPosition,
  setIndicatorPosition,
  children,
}) => {
  useEffect(
    () => {
      [...document.getElementsByClassName("handler")].forEach((elem) =>
        elem.addEventListener("mousedown", handleMouseDown)
      );
      document.getElementById("box") &&
        [...document.getElementById("box")?.children].map((elem, i) =>
          elem.setAttribute("index", i)
        );
    },
    children,
    [...document.getElementsByClassName("handler")].length,
    document.getElementById("box")
  );

  if (!children.length) return <></>;

  let idE = null;
  let index = -1;
  // const getIndex = (e) => {
  //   return [...document.getElementsByClassName("handler")].findIndex(
  //     (elem) => elem.id === e.currentTarget!.id
  //   );
  // };
  let startPosition = { x: 0, y: 0 };
  const handleMouseDown = (e: MouseEvent) => {
    startPosition = { x: e.clientX, y: e.clientY };
    // id = e.currentTarget!.id.split("-handler")[0];
    // console.log(e.currentTarget!.parentNode.parentNode);
    idE = e.currentTarget!.parentNode.parentNode;
    index = Number(
      e.currentTarget!.parentNode.parentNode.getAttribute("index")
    );
    // console.log(index);

    idE!.style.zIndex = "100";
    idE!.style.opacity = "0.6";

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    // console.log(e.target!.id);

    idE!.style.opacity = "0.6";
    idE!.style.transform = `translate(${e.clientX - startPosition.x}px, ${
      e.clientY - startPosition.y
    }px)`;
    // console.log(
    //   index + Math.max(Math.floor(Math.abs(startPosition.y - e.clientY) / 100))
    // );
    Math.floor(Math.abs(startPosition.y - e.clientY) / 100) === 0 &&
      (document.getElementById("indicator")!.style.display! = "none");

    if (Math.floor(Math.abs(startPosition.y - e.clientY) / 100) !== 0) {
      setTimeout(
        () => (document.getElementById("indicator")!.style.display! = "block"),
        10
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
    // console.log(Math.abs(startPosition.y - e.clientY) / 100);

    setTimeout(
      () => (document.getElementById("indicator")!.style.display! = "none"),
      20
    );
    idE!.style.opacity = "1";
    idE!.style.transform = `translate(0px, 0px)`;

    idE!.style.zIndex = "0";

    // document.getElementById("indicator")!.style.display! = "none";
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
    onSort(tempArr);
    // }

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // document.getElementById("box") &&
  // [...document.getElementsByClassName("handler")].forEach((elem) =>
  //   elem.addEventListener("mousedown", handleMouseDown)
  // );

  return <div id="box">{children}</div>;
};

export default TakeSortable;
