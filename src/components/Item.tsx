import { TItem } from "../types/item";

const Item = ({ item }: TItem) => {
  return (
    <div
      key={item.id}
      style={{
        width: 300,
        height: 50,
        marginBottom: 50,
        background: "lightblue",
        color: "black",
        transform: `translate(0px, 0px)`,
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div
          className="handler"
          style={{
            height: 50,
            width: 50,
            border: "1px solid blue",
            cursor: "grab",
          }}
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
          {item.id}: {item.title} ({item.value})
        </div>
      </div>
    </div>
  );
};

export default Item;
