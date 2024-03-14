import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { updateList } from "../state/listsSlice";
import { ListProps } from "./List";

export default function DateSelect({ list }: ListProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DatePicker
      selected={list.reminder ? new Date(list.reminder) : new Date()}
      onChange={(date) =>
        date && dispatch(updateList({ ...list, reminder: date }))
      }
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={1}
      timeCaption="time"
      dateFormat="MMMM d, yyyy HH:mm "
      portalId="root-portal"
      minDate={new Date()}
    />
  );
}
