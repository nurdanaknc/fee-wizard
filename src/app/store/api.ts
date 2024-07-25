import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FeeWizardState {
  navbar: boolean;
}
const initialState: FeeWizardState = {
  navbar: false,
};
export const feeWizardSlice = createSlice({
  name: "feeWizard",
  initialState,
  reducers: {
    activateNavbar: (state) => {
      state.navbar = true;
    },
    deactivateNavbar: (state) => {
      state.navbar = false;
    },
  },
});

export const { activateNavbar, deactivateNavbar } = feeWizardSlice.actions;
export default feeWizardSlice.reducer;
