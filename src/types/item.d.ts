interface TSingleItem {
  id: string;
  title: string;
  value: number;
}

interface TItem {
  item: TSingleItem;
}

export { TItem, TSingleItem };
