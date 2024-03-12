import { useEffect, useRef, useState } from "react";
import { delList, updateList, type ListType } from "../state/listsSlice";
import ListItem, { StyledInput } from "./ListItem.tsx";
import { useDispatch, useSelector } from "react-redux";
import { addNewItem, fetchItems } from "../state/itemsSlice.tsx";
import { AppDispatch, RootState } from "../state/store.tsx";
import styled from "styled-components";
import { v4 as uuid4 } from "uuid";

const StyledTrash = styled.div`
  display: none;
  position: absolute;
  top: 3px;
  right: 7px;
`;

const StyledList = styled.div`
  width: 15rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  margin: 0.5rem;
  border-radius: 0.25rem;
  position: relative;

  ul {
    list-style: none;
    text-align: left;
    padding-left: 0.25rem;
  }
`;

const StyledHeadlineInput = styled(StyledInput)`
  width: 180px;
  height: 20px;
  text-align: center;
  font-size: 20px;
  background-color: #f0ead2;
  margin: 0.25rem;
  border: none;
  border-radius: 0.25rem;
  &:focus {
    outline: 1px solid;
    outline-color: #9e9e9e;
  }
`;

const StyledButton = styled.button`
  border: none;
  background-color: #6c584c;
  color: #f0ead2;
  font-weight: bold;
  width: 1rem;
  height: 1rem;
  padding: 0 0 0.14rem;
  border-radius: 50%;
  text-align: center;
  line-height: 0;
`;

const Wrapper = styled.div`
  &:hover ${StyledTrash} {
    display: block;
  }
`;

interface ListProps {
  list: ListType;
}

export default function List({ list }: ListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef(null);
  const [input, setInput] = useState<string>("");
  const { items, status } = useSelector((state: RootState) => state.items);
  const [headlineInput, setHeadlineInput] = useState<string>(list.title);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems(list.listId));
    }
  }, [status, dispatch, list.listId]);

  return (
    <StyledList>
      <Wrapper>
        <StyledHeadlineInput
          type="text"
          value={headlineInput}
          onChange={(e) => {
            setHeadlineInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(
                updateList({ listId: list.listId, title: headlineInput })
              );
              e.currentTarget.blur();
            }
          }}
        />
        <StyledTrash onClick={() => dispatch(delList({ listId: list.listId }))}>
          <i className="fa-solid fa-trash"></i>
        </StyledTrash>
      </Wrapper>
      <ul>
        {items.map(
          (i) =>
            i.listId === list.listId && (
              <ListItem item={i} key={i.id} id={i.id} />
            )
        )}
        <li>
          <StyledButton
            onClick={() => {
              ref.current?.focus();
            }}
          >
            +
          </StyledButton>
          <StyledInput
            ref={ref}
            value={input}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(
                  addNewItem({
                    listId: list.listId,
                    content: input,
                    checked: false,
                    id: uuid4(),
                    important: false,
                  })
                );
                e.currentTarget.blur();
                setInput("");
              }
            }}
          />
        </li>
      </ul>
    </StyledList>
  );
}
