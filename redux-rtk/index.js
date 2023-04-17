const store = require("./app/store");
const cakeActions = require("./features/cake/cakeSlice").actions;
const icecreamActions = require("./features/icecream/icecreamSlice").actions;
const userFetch = require("./features/user/userSlice").fetchUsers;
console.log("Initial state: ", store.getState());
const unsubscribe = store.subscribe(() => {});

// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());

// store.dispatch(cakeActions.restocked(04));

// store.dispatch(icecreamActions.ordered(04));
// store.dispatch(icecreamActions.ordered(04));
// store.dispatch(icecreamActions.restocked(04));

store.dispatch(userFetch());

// unsubscribe();
