import { useState } from "react";
import { addList } from "../state/listsSlice";
import { useDispatch } from "react-redux";

export default function CreateListForm() {
  const dispatch = useDispatch();
  const [newList, setNewList] = useState<string>("");
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addList({ title: newList }));
    setNewList("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Create a new List..."
        onChange={(e) => {
          setNewList(e.target.value);
        }}
        value={newList}
      />
      <button>Add</button>
    </form>
  );
}
