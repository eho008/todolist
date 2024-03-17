import { FormEvent, useState } from "react";
import { addNewList } from "../state/listsSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { StyledInput } from "./ListItem";
import { AppDispatch } from "../state/store";
import { v4 as uuid4 } from "uuid";

const StyledForm = styled.form`
  background-color: #dde5b6;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  background-color: #6c584c;
  color: #f0ead2;
`;

export default function CreateListForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [newList, setNewList] = useState<string>("");
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      addNewList({ title: newList, listId: uuid4(), createdAt: Date.now() })
    );
    setNewList("");
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder="Create a new List..."
        onChange={(e) => {
          setNewList(e.target.value);
        }}
        value={newList}
      />
      <StyledButton>Add</StyledButton>
    </StyledForm>
  );
}
