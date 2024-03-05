import { useRef, useState } from "react";
import { deleteList, type ListType } from "../state/listsSlice";
import ListItem from "./ListItem.tsx";
import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../state/itemsSlice.tsx";

type ListProps = {
  list: ListType;

  key: string;
};

export default function List({ list }: ListProps) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [input, setInput] = useState<string>("");

  const items = useSelector((state: RootState) => state.items);

  return (
    <div className="list">
      <h3>{list.title}</h3>
      <div
        className="trash"
        onClick={() => dispatch(deleteList({ id: list.listId }))}
      >
        <i className="fa-solid fa-trash"></i>
      </div>
      <ul>
        {items.map(
          (i) =>
            i.listId === list.listId && (
              <ListItem item={i} key={i.itemId} listId={list.listId} />
            )
        )}
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
                dispatch(addItem({ id: list.listId, listsItem: input }));
                setInput("");
              }
            }}
          />
        </li>
      </ul>
    </div>
  );
}
