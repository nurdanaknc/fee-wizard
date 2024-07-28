import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance as axios } from "@/helpers/axios";

export interface sitesState {
  plans?: {
    _id: string;
    site: string;
    name: string;
    year: number;
    created_At: string;
    __v: number;
    monthlyTotals: number[];
    total: number;
  }[];
  expenses?: {
    _id: string;
    plan: {};
    name: string;
    firstMonth: number;
    periodicCalculationMethod: string;
    predictedCalculationMethod: string;
    created_At: string;
    __v: number;
    monthly: any[];
    total: number;
  }[];
  calculationMethodOptions?: {
    periodic: {
      id: string;
      label: string;
    }[];
    predicted: {
      id: string;
      label: string;
    }[];
  };
}

const initialState: sitesState = {
  plans: [],
  expenses: [],
  calculationMethodOptions: {
    periodic: [],
    predicted: [],
  },
};

export const getSitesByManagerId = createAsyncThunk(
  "getSitesByManagerId",
  async (id: string) => {
    try {
      const response = await axios.get(`/api/server/sites/manager/${id}`);
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
      const response = await axios.get(`/api/server/plans/site/${site_id}`);
      console.log(response, "response");
      return response;
    } catch (e: any) {
      return e?.response;
    }
  }
);

export const addPlan = createAsyncThunk(
  "addPlan",
  async (data: { site_id: string; name: string; year: number }) => {
    try {
      const response = await axios.post(`/api/server/plans/add`, data);
      console.log(response, "response");
      return response;
    } catch (e: any) {
      return e?.response;
    }
  }
);

export const getExpensesByPlanId = createAsyncThunk(
  "getExpensesByPlanId",
  async (plan_id: string) => {
    try {
      const response = await axios.get(`/api/server/expenses/plan/${plan_id}`);
      console.log(response, "response");
      return response;
    } catch (e: any) {
      return e?.response;
    }
  }
);

export const addExpense = createAsyncThunk(
  "addExpense",
  async (data: {
    plan_id: string;
    name: string;
    firstMonth: number;
    periodicCalculationMethod: string;
    predictedCalculationMethod: string;
  }) => {
    try {
      const response = await axios.post(`/api/server/expenses/add`, data);
      console.log(response, "response");
      return response;
    } catch (e: any) {
      return e?.response;
    }
  }
);

export const getCalculationMethodByTypeAndSiteId = createAsyncThunk(
  "getCalculationMethodByTypeAndSiteId",
  async (credentials: { site_id: string; type: string }) => {
    try {
      const response = await axios.get(
        `/api/server/calculation-methods/site/${credentials.site_id}/type/${credentials.type}`
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlansBySiteId.fulfilled, (state, action) => {
      state.plans = action.payload?.data;
    });

    builder.addCase(getExpensesByPlanId.fulfilled, (state, action) => {
      state.expenses = action.payload?.data;
    });

    builder.addCase(
      getCalculationMethodByTypeAndSiteId.fulfilled,
      (state, action) => {
        if (
          action.payload?.data?.some((item: any) => item.type === "periodic")
        ) {
          state.calculationMethodOptions!.periodic = action.payload?.data?.map(
            (item: any) => {
              return {
                id: item?._id,
                label: item?.name,
              };
            }
          );
        } else if (
          action.payload?.data?.some((item: any) => item.type === "predicted")
        ) {
          state.calculationMethodOptions!.predicted = action.payload?.data?.map(
            (item: any) => {
              return {
                id: item?._id,
                label: item?.name,
              };
            }
          );
        }
      }
    );
  },
});

export const {} = sitesSlice.actions;
export default sitesSlice.reducer;
