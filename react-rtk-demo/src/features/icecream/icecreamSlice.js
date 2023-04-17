import { createSlice } from "@reduxjs/toolkit";

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

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
