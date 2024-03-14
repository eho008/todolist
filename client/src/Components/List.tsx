import { useEffect, useRef, useState } from "react";
import { updateList, type ListType } from "../state/listsSlice";
import ListItem, { StyledInput } from "./ListItem.tsx";
import { useDispatch, useSelector } from "react-redux";
import { addNewItem, fetchItems } from "../state/itemsSlice.tsx";
import { AppDispatch, RootState } from "../state/store.tsx";
import styled from "styled-components";
import { v4 as uuid4 } from "uuid";
import Dropdown from "./Dropdown.tsx";
import DatePicker from "./DatePicker.tsx";

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
  width: 150px;
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
  &:hover {
    display: block;
  }
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
`;

const StyledAlarm = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  border-radius: 0.75rem;
  background-color: #bfcab4;
  padding: 0 0.3rem;
  margin: 0.3rem;
  width: 12.2rem;
  height: 1.5rem;
`;

const StyledBell = styled.img`
  background-color: inherit;
  height: 0.75rem;
  margin: 0.3rem;
`;

const StyledEmptyBell = styled.i`
  font-size: small;
  background-color: inherit;
  margin: 0.3rem;
`;

const StyledX = styled.i`
  background-color: inherit;
`;

export interface ListProps {
  list: ListType;
}

export default function List({ list }: ListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef(null);
  const [input, setInput] = useState<string>("");
  const { items, status } = useSelector((state: RootState) => state.items);
  const [headlineInput, setHeadlineInput] = useState<string>(list.title);
  const [timeUp, setTimeUp] = useState<boolean>(false);

  useEffect(() => {
    const timer = list.reminder
      ? new Date(list.reminder).getTime() - Date.now()
      : 0;
    if (timer > 0) {
      setTimeUp(false);
      const timeOut = setTimeout(() => {
        setTimeUp(true);
      }, timer);
      return () => clearTimeout(timeOut);
    } else if (timer < 0) {
      setTimeUp(true);
    }
  }, [list, setTimeUp]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems(list.listId));
    }
  }, [status, dispatch, list.listId]);

  return (
    <>
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
                dispatch(updateList({ ...list, title: headlineInput }));
                e.currentTarget.blur();
              }
            }}
          />
          <Dropdown list={list} />
        </Wrapper>
        <ul>
          {items.map(
            (i) =>
              i.listId === list.listId && (
                <ListItem item={i} key={i.id} id={i.id} />
              )
          )}
          <StyledListItem>
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
          </StyledListItem>
        </ul>
        {list.reminder && (
          <StyledAlarm className={timeUp ? "over" : undefined}>
            {timeUp ? (
              <StyledBell src="../../public/001-bell.png" alt="bell" />
            ) : (
              <StyledEmptyBell className="fa-regular fa-bell"></StyledEmptyBell>
            )}
            <DatePicker list={list} />
            <StyledX
              className="fa-solid fa-xmark"
              onClick={() =>
                dispatch(updateList({ ...list, reminder: undefined }))
              }
            ></StyledX>
          </StyledAlarm>
        )}
      </StyledList>
    </>
  );
}
