const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numberofIcecreams: 20,
};

const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numberofIcecreams -= action.payload;
    },
    restocked: (state, action) => {
      state.numberofIcecreams += action.payload;
    },
  },
  //   extraReducers: {
  //     ["cake/ordered"]: (state) => {
  //       state.numberofIcecreams = state.numberofIcecreams - 1;
  //     },
  //   },
  extraReducers: (builder) => {
    builder.addCase("cake/ordered", (state) => {
      state.numberofIcecreams = state.numberofIcecreams - 1;
    });
  },
});

module.exports = icecreamSlice.reducer;
module.exports.actions = icecreamSlice.actions;
