import { useState } from "react";
import { useDispatch } from "react-redux";
import { delItem, updateItem } from "../state/itemsSlice";
import { ItemType } from "../state/itemsSlice";
import styled from "styled-components";
import { AppDispatch } from "../state/store";

const XSign = styled.div`
  display: none;
  opacity: 0.33;
  transition: all 0.2s;
  &:hover {
    opacity: 1;
    font-size: 17px;
  }
`;

const StyledImg = styled.img`
  display: none;
  width: 15px;
  height: 15px;
  opacity: 0.33;
  transition: all 0.2s;
  &:hover {
    width: 17px;
    height: 17px;
  }
`;

const StyledListItem = styled.li`
  &:hover ${XSign} {
    display: block !important;
  }
  &:hover ${StyledImg} {
    display: block !important;
  }
`;

const StyledItemName = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
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
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState<string>(item.content);

  function importantStyle(important: boolean) {
    if (important) {
      return { display: "block", opacity: 1 };
    } else {
      return {};
    }
  }

  return (
    <StyledListItem>
      <StyledItemName>
        {/* <div className={item.checked ? "checked" : undefined}> */}

        <input
          type="checkbox"
          onChange={() =>
            dispatch(
              updateItem({
                id: item.id,
                content: item.content,
                listId: item.listId,
                checked: !item.checked,
                important: item.important,
              })
            )
          }
        />

        <StyledInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(
                updateItem({
                  id: item.id,
                  content: input,
                  listId: item.listId,
                  checked: item.checked,
                  important: item.important,
                })
              );
              e.currentTarget.blur();
            }
          }}
          className={item.checked ? "checked" : undefined}
        />
        <StyledImg
          src="../../public/prio.png"
          alt="important.png"
          onClick={() => {
            dispatch(updateItem({ ...item, important: !item.important }));
          }}
          style={importantStyle(item.important)}
        />
        {/* </div> */}
        <XSign
          onClick={() =>
            dispatch(delItem({ id: item.id, listId: item.listId }))
          }
        >
          {<i className="fa-solid fa-xmark"></i>}
        </XSign>
      </StyledItemName>
    </StyledListItem>
  );
}
