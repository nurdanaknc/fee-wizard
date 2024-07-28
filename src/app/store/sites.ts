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
    periodicCalculationMethod: any;
    predictedCalculationMethod: any;
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

export const addSite = createAsyncThunk(
  "addSite",
  async (data: { name: string; location: string; managers: string[] }) => {
    try {
      const response = await axios.post(`/api/server/sites/add`, data);
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

export const getPlanById = createAsyncThunk(
  "getPlanById",
  async (plan_id: string) => {
    try {
      const response = await axios.get(`/api/server/plans/${plan_id}`);
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

export const updateExpenseById = createAsyncThunk(
  "updateExpense",
  async (data: {
    expense_id: string;
    plan_id: string;
    name: string;
    firstMonth: number;
    periodicCalculationMethod: string;
    predictedCalculationMethod: string;
  }) => {
    try {
      const response = await axios.put(`/api/server/expenses/update/${data.expense_id}`,
        {
          plan_id: data.plan_id,
          name: data.name,
          firstMonth: data.firstMonth,
          periodicCalculationMethod: data.periodicCalculationMethod,
          predictedCalculationMethod: data.predictedCalculationMethod,
        }
      );
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

export const getCalculationMethodsBySiteId = createAsyncThunk(
  "getCalculationMethodsBySiteId",
  async (site_id: string) => {
    try {
      const response = await axios.get(`/api/server/calculation-methods/site/${site_id}`);
      console.log(response, "response");
      return response;
    } catch (e: any) {
      return e?.response;
    }
  }
);
export const addCalculationMethod = createAsyncThunk(
  "addCalculationMethod",
  async (data: {
    site_id: string;
    name: string;
    type: string;
    monthlyRates: number[];
  }) => {
    try {
      const response = await axios.post(`/api/server/calculation-methods/add`, data);
      console.log(response, "response");
      return response;
    } catch (e: any) {
      return e?.response;
    }
  }
);
export const updateCalculationMethod = createAsyncThunk(
  "updateCalculationMethod",
  async (data: {
    method_id: string;
    site_id: string;
    name: string;
    type: string;
    monthlyRates: number[];
  }) => {
    try {
      const response = await axios.put(`/api/server/calculation-methods/update/${data.method_id}`, {
        site_id: data.site_id,
        name: data.name,
        type: data.type,
        monthlyRates: data.monthlyRates,
      });
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
