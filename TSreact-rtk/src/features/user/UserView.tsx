import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { useSelector, useDispatch } from "react-redux"; // useSelector is a hook that allows you to extract data from the Redux store state, using a selector function.
// useDispatch is a hook that returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
import { fetchUsers } from "./userSlice";

export const UserView = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      <h2>User View</h2>
      {user.loading && <h3>Loading...</h3>}
      {user.error && <h3>{user.error}</h3>}
      {user.users && (
        <ul>
          {user.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
