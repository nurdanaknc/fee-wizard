import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance as axios} from "@/helpers/axios";

export interface FeeWizardState {
  navbar: boolean;
  user: {
    _id: string,
    fullname: string,
    email: string,
  }
}
const initialState: FeeWizardState = {
  navbar: false,
  user: {
    _id: "",
    fullname: "",
    email: "",
  }
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
    setUser: (state, action: PayloadAction<FeeWizardState["user"]>) => {
      state.user = action.payload;
    }
  },
});

export const { activateNavbar, deactivateNavbar, setUser } = feeWizardSlice.actions;
export default feeWizardSlice.reducer;
