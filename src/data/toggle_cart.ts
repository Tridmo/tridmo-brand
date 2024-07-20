import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  toggle_cart_action_status: false,
  cart_items_count: 0,
  status: 'idle',
  error: null,
}

const toggle_cart_status = createSlice({
  name: "toggle_cart_status",
  initialState,
  reducers: {
    switch_on(state: any, action: PayloadAction<boolean>) {
      state.toggle_cart_action_status = null;
      state.toggle_cart_action_status = action.payload;
    },
  },
  extraReducers(builder) {

  }
});

export const { switch_on } = toggle_cart_status.actions;
export const selectToggleCardActionStatus = (state: any) => state?.toggle_cart?.toggle_cart_action_status;
export const reducer = toggle_cart_status.reducer;
export default toggle_cart_status;