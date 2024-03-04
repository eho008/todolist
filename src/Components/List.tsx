import { useRef, useState } from "react";
import { deleteList, type ListType } from "../state/listsSlice";
import ListItem from "./ListItem.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store.tsx";
import { addItem } from "../state/listsSlice.tsx";

type ListProps = {
  list: ListType;

  id: string;
};

export default function List({ list, id }: ListProps) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [input, setInput] = useState<string>("");
  const [style, setStyle] = useState<{ display: string }>({ display: "none" });

  return (
    <div
      className="list"
      onMouseEnter={(e) => {
        setStyle({ display: "block" });
      }}
      onMouseLeave={(e) => {
        setStyle({ display: "none" });
      }}
    >
      <h3>{list.title}</h3>
      <div
        className="trash"
        style={style}
        onClick={() => dispatch(deleteList({ id: id }))}
      >
        <i className="fa-solid fa-trash"></i>
      </div>
      <ul>
        {list.items.map((i) => (
          <ListItem item={i} listId={id} />
        ))}
        <li>
          <button className="addItem" onClick={() => ref.current.focus()}>
            +
          </button>
          <input
            ref={ref}
            value={input}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(addItem({ id: input, listsItem: input }));
                setInput("");
              }
            }}
          />
        </li>
      </ul>
    </div>
  );
}
