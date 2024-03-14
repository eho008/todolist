import styled from "styled-components";
import useComponentVisible from "../hooks/useComponent";
import { ListType, delList, updateList } from "../state/listsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";

const StyledDropdownButton = styled.div`
  opacity: 0.33;
  position: absolute;
  top: 3px;
  right: 7px;
  width: 20px;
  height: 20px;
  &:hover {
    opacity: 1;
  }
`;

const StyledListItem = styled.li`
  background-color: #f7f3e6;
  width: 30px;
  text-align: center;
`;

interface DropdownPorps {
  list: ListType;
}

export default function Dropdown({ list }: DropdownPorps) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <StyledDropdownButton
        onClick={() => {
          setIsComponentVisible(true);
        }}
      >
        <i className="fa-solid fa-list-ul"></i>
      </StyledDropdownButton>
      <ul
        className="dropdown"
        style={{ display: isComponentVisible ? "block" : "none" }}
        ref={ref}
      >
        <StyledListItem
          onClick={() =>
            dispatch(updateList({ ...list, reminder: new Date(Date.now()) }))
          }
        >
          <i className="fa-regular fa-bell"></i>
        </StyledListItem>
        <StyledListItem
          onClick={() => dispatch(delList({ listId: list.listId }))}
        >
          <i className="fa-solid fa-trash"></i>
        </StyledListItem>
      </ul>
    </>
  );
}
