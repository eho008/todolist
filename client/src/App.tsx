import CreateListForm from "./Components/CreateListForm.tsx";
import List from "./Components/List.tsx";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./state/store.tsx";
import { type ListType } from "./state/listsSlice.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { fetchLists } from "./state/listsSlice.tsx";
import Search from "./Components/Search.tsx";
import { fetchItems } from "./state/itemsSlice.tsx";

const StyledPage = styled.div`
  display: flex;
  margin: auto;
  background-color: #dde5b6;
  width: 600px;
`;

const StyledBorder = styled.div`
  width: 50px;
  height: 90vh;
  background-color: #adc178;
  background-image: radial-gradient(circle, #f0ead2 10px, transparent 11px);
  background-size: 100% 10%;
`;

const StyledPaper = styled.div`
  background-color: #dde5b6;
  width: 100%;
  text-align: center;
  h1 {
    background-color: #dde5b6;
    color: #a98467;
  }
`;

const StyledLists = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 0.5rem;
  background-color: #dde5b6;
  align-items: flex-start;
`;

function App() {
  const [query, setQuery] = useState<string>("");
  const lists = useSelector((state: RootState) => state.lists.lists);
  const listsStatus = useSelector((state: RootState) => state.lists.status);
  const items = useSelector((state: RootState) => state.items.items);
  const itemsStatus = useSelector((state: RootState) => state.items.status);
  const dispatch = useDispatch<AppDispatch>();
  const [filteredLists, setFilteredLists] = useState<ListType[]>([]);

  function searchQuery({ strg, query }: { strg: string; query: string }) {
    return strg.toLowerCase().includes(query.toLowerCase());
  }

  useEffect(() => {
    if (listsStatus === "idle") {
      dispatch(fetchLists());
    }
    if (itemsStatus === "idle" && listsStatus === "succeeded") {
      lists.map((list) => dispatch(fetchItems(list.listId)));
    }
  }, [listsStatus, dispatch, itemsStatus, lists]);

  useEffect(() => {
    if (listsStatus === "succeeded" && itemsStatus === "succeeded") {
      const filterList = lists.filter(
        (list) =>
          searchQuery({ strg: list.title, query: query }) ||
          items.some(
            (item) =>
              item.listId === list.listId &&
              searchQuery({ strg: item.content, query: query })
          )
      );

      setFilteredLists(filterList);
    }
  }, [lists, listsStatus, setFilteredLists, query, items, itemsStatus]);

  return (
    <StyledPage>
      <StyledBorder />
      <StyledPaper>
        <div className="top-page">
          <Search setQuery={setQuery} />
          <h1>To Do List</h1>
        </div>
        <CreateListForm />
        <StyledLists>
          {filteredLists.map((list: ListType) => (
            <List list={list} key={list.listId} />
          ))}
        </StyledLists>
      </StyledPaper>
    </StyledPage>
  );
}

export default App;
