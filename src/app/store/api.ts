import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance as axios} from "@/helpers/axios";

export interface FeeWizardState {
  navbar: boolean;
}
const initialState: FeeWizardState = {
  navbar: false,
};


export const api = createAsyncThunk(
  "api",
  async (id: string) => {
    try {
      const response = await axios.post(
        `/api/server/..`
      );
      return response?.data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
);

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
