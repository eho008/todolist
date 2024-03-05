import { useState } from "react";
import { addList } from "../state/listsSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

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
  const dispatch = useDispatch();
  const [newList, setNewList] = useState<string>("");
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addList({ title: newList }));
    setNewList("");
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
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
