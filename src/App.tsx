import CreateListForm from "./Components/CreateListForm.tsx";
import List from "./Components/List.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./state/store.tsx";
import { type ListType } from "./state/listsSlice.tsx";

function App() {
  const lists = useSelector((state: RootState) => state.lists);

  return (
    <div className="page">
      <div className="border">
        <div className="dot-line"></div>
      </div>
      <div className="paper">
        <h1 className="title">To Do List</h1>
        <div className="createList">
          <CreateListForm />
        </div>
        <div className="lists">
          {lists.map((list: ListType) => (
            <List list={list} id={list.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
