import React from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector is a hook that allows you to extract data from the Redux store state, using a selector function.
// sort of wrapper around the store's getState() method.
import { ordered, restocked } from "./cakeSlice";

export const CakeView = () => {
  const numberOfCakes = useSelector((state) => state.cake.numOfCakes);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Cake View</h1>
      <h3>Number of Cakes - {numberOfCakes}</h3>
      <button onClick={() => dispatch(ordered())}>Order Cake</button>
      <button onClick={() => dispatch(restocked(10))}>Restock Cake</button>
    </div>
  );
};
