import CreateListForm from "./Components/CreateListForm.tsx";
import List from "./Components/List.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./state/store.tsx";
import { type ListType } from "./state/listsSlice.tsx";
import styled from "styled-components";

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
  const lists = useSelector((state: RootState) => state.lists);

  return (
    <StyledPage>
      <StyledBorder />
      <StyledPaper>
        <h1>To Do List</h1>
        <CreateListForm />
        <StyledLists>
          {lists.map((list: ListType) => (
            <List list={list} key={list.listId} />
          ))}
        </StyledLists>
      </StyledPaper>
    </StyledPage>
  );
}

export default App;
