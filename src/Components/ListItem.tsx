import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, editItem } from "../state/itemsSlice";
import { ItemType } from "../state/itemsSlice";
import styled from "styled-components";

const XSign = styled.div`
  display: none;
`;

const StyledListItem = styled.li`
  &:hover ${XSign} {
    display: block;
  }
`;

const StyledItemName = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledInput = styled.input`
  background-color: #f0ead2;
  margin: 0.25rem;
  border: none;
  border-radius: 0.25rem;

  &:hover {
    background-color: #f7f3e6;
  }
  &:focus-visible {
    background-color: #f7f3e6;
    outline: 1px solid;
    outline-color: #9e9e9e;
  }
`;

interface ListItemProps {
  item: ItemType;
  id: string;
}

export default function ListItem({ item }: ListItemProps) {
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>(item.content);

  return (
    <StyledListItem>
      <StyledItemName>
        <div className={item.checked ? "checked" : undefined}>
          <input
            type="checkbox"
            onChange={() => dispatch(editItem({ id: item.id, checked: true }))}
          />
          <StyledInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(editItem({ id: item.id, listsItem: input }));
                e.currentTarget.blur();
              }
            }}
          />
        </div>
        <XSign onClick={() => dispatch(deleteItem({ itemId: item.id }))}>
          {<i className="fa-solid fa-xmark"></i>}
        </XSign>
      </StyledItemName>
    </StyledListItem>
  );
}
