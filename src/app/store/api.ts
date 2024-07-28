import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance as axios} from "@/helpers/axios";

export interface FeeWizardState {

  user: {
    _id: string,
    fullname: string,
    email: string,
  }
}
const initialState: FeeWizardState = {

  user: {
    _id: "",
    fullname: "",
    email: "",
  }
};

export const feeWizardSlice = createSlice({
  name: "feeWizard",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FeeWizardState["user"]>) => {
      state.user = action.payload;
    }
  },
});

export const { setUser } = feeWizardSlice.actions;
export default feeWizardSlice.reducer;
