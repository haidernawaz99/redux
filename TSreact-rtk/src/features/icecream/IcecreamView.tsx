import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { useSelector, useDispatch } from "react-redux"; // useSelector is a hook that allows you to extract data from the Redux store state, using a selector function.
// sort of wrapper around the store's getState() method.
import { ordered, restocked } from "./icecreamSlice";

export const IcecreamView = () => {
  const [icecreamRestockFactor, setIcecreamRestockFactor] = React.useState(1);
  const numberofIcecream = useAppSelector(
    (state) => state.icecream.numberofIcecreams
  );
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Ice-Cream View</h1>
      <h3>Number of Ice Cream - {numberofIcecream} </h3>
      <button onClick={() => dispatch(ordered(1))}>Order Ice Cream</button>
      <input
        type="number"
        onChange={(e) => setIcecreamRestockFactor(parseInt(e.target.value))}
      />
      <button onClick={() => dispatch(restocked(icecreamRestockFactor))}>
        Restock Ice Creams
      </button>
    </div>
  );
};
