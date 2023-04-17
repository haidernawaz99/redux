const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// ACTION CREATORS
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// ASYNC ACTION CREATOR
// Return a function instead of an action object. This function will be called by the Redux Thunk middleware.
// it can do this because it has access to the dispatch function. This function is called with the dispatch function as the first argument. Inside the function, you can dispatch actions and perform asynchronous tasks.
// The function doesn't have to be pure; it is thus permitted to have side effects, including executing asynchronous API calls.
const fetchUsers = () => {
  return async function (dispatch) {
    dispatch(fetchUsersRequest()); // <-- making loading true
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const userIDS = res.data.map((user) => user.id);
      dispatch(fetchUsersSuccess(userIDS)); // <-- send userIDS to reducer
    } catch (error) {
      dispatch(fetchUserFailure(error.message)); // <-- send error message to reducer
    }
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
