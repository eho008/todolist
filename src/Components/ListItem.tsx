import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../state/listsSlice";

type ListItemProps = {
  item: string;

  listId: string;
};

export default function ListItem({ item, listId }: ListItemProps) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(false);
  const [style, setStyle] = useState<{ display: string }>({ display: "none" });

  function handleCheck() {
    setChecked((p) => !p);
  }
  return (
    <li
      onMouseEnter={(e) => {
        setStyle({ display: "block" });
      }}
      onMouseLeave={(e) => {
        setStyle({ display: "none" });
      }}
      className="yeller"
    >
      <div className="itemName">
        <div className={checked ? "checked" : ""}>
          <input type="checkbox" onChange={() => handleCheck()} />
          {item}
        </div>
        <div
          style={style}
          onClick={(e) => dispatch(deleteItem({ listId: listId, item: item }))}
        >
          {<i className="fa-solid fa-xmark"></i>}
        </div>
      </div>
    </li>
  );
}
