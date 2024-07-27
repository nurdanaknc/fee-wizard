import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance as axios} from "@/helpers/axios";


export interface sitesState {
    plans?: {
        _id: string,
        site: string,
        name: string,
        year: number,
        created_At: string,
        __v: number,
        monthlyTotals: number[],
        total: number,
    }[]
    }


const initialState: sitesState = {
    plans: [],

};

export const getSitesByManagerId = createAsyncThunk(
    "getSitesByManagerId",
    async (id: string) => {
      try {
        const response = await axios.get(
            `/api/server/sites/manager/${id}`,
            
        );
        console.log(response, "response");
        return response;
      } catch (e: any) {
        return e?.response;
      }
    }
  );

export const getPlansBySiteId = createAsyncThunk(
    "getPlansBySiteId",
    async (site_id: string) => {
      try {
        const response = await axios.get(
            `/api/server/plans/site/${site_id}`,
        );
        console.log(response, "response");
        return response;
      } catch (e: any) {
        return e?.response;
      }
    }
    );  

export const sitesSlice = createSlice({
    name: "sites",
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
        builder.addCase(getPlansBySiteId.fulfilled, (state, action) => {
            state.plans = action.payload?.data;
        });
    }
});



export const {  } = sitesSlice.actions;
export default sitesSlice.reducer;