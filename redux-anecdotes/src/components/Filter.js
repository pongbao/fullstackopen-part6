import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <p>
      filter
      <input
        name="filter"
        onChange={(event) => {
          dispatch(filterChange(event.target.value));
        }}
      ></input>
    </p>
  );
};

export default Filter;
