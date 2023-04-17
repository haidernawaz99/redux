const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

console.log("Hello World!");
const CAKE_ORDERED = "CAKE_ORDERED";
const ICE_CREAM_ORDERED = "ICE_CREAM_ORDERED";
const ICE_CREAM_RESTOCKED = "ICE_CREAM_RESTOCKED";

// ACTION describes what happened but doesn't specify how the application's state changes in response. This is the job of the reducer.

// ACTION CREATOR is a function that creates an action. It's just a function that returns an action object. It's not required, but it's a common pattern in Redux apps.
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: "CAKE_RESTOCKED",
    payload: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICE_CREAM_ORDERED,
    payload: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICE_CREAM_RESTOCKED,
    payload: qty,
  };
}

// REDUCER is a pure function that takes the previous state and an action, and returns the next state. (previousState, action) => newState
// Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.
// Reducers are the only place where the state can be updated. They must be pure functions - functions that return the exact same result if given the same arguments. They should also be free of side effects. This is what enables exciting features like hot reloading and time travel.

// State must be an object
// const initialState = {
//   numberOfCakes: 10,
//   numberofIcecreams: 20,
// };

const initialCakeState = {
  numberOfCakes: 10,
};

const initialIcecreamState = {
  numberofIcecreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case "CAKE_RESTOCKED":
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      };

    default:
      return state;
  }
};
const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numberofIcecreams: state.numberofIcecreams - action.payload,
      };
    case ICE_CREAM_RESTOCKED:
      return {
        ...state,
        numberofIcecreams: state.numberofIcecreams + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => {});

// DISPATCH is the way to trigger a state change. You call store.dispatch() and pass in an action object.
// The store will run its reducer function and save the new state value inside, and we can call getState() to retrieve the current value of the state.

// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake(5));

const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();

actions.restockCake(5);

actions.orderIcecream(2);
actions.orderIcecream(2);
actions.restockIcecream(5);

unsubscribe();
