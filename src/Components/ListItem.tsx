import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../state/itemsSlice";

type ListItemProps = {
  item: { content: string; itemId: string };
  listId: string;
  key: string;
};

export default function ListItem({ item }: ListItemProps) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <li className="listItem">
      <div className="itemName">
        <div className={checked ? "checked" : ""}>
          <input type="checkbox" onChange={() => setChecked((p) => !p)} />
          {item.content}
        </div>
        <div
          onClick={() => dispatch(deleteItem({ itemId: item.itemId }))}
          className="x-sign"
        >
          {<i className="fa-solid fa-xmark"></i>}
        </div>
      </div>
    </li>
  );
}
