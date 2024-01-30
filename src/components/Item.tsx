import { TItem } from "../types/item";

const Item = ({ item }: TItem) => {
  return (
    <div className="styles-box-container">
      <div className="styles-box">
        <div className="handler styles-handler"></div>
        <div className="styles-box-data">
          {item.id}: {item.title} ({item.value})
        </div>
      </div>
    </div>
  );
};

export default Item;
