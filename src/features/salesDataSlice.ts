import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
  customer: string;
  review: string;
  score: number;
}

interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface SalesData {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  retailer: string;
  tags: string[];
  reviews: Review[];
  sales: Sale[];
}

interface SalesState {
  data: SalesData[];
}

const initialState: SalesState = {
  data: [],
};

const salesDataSlice = createSlice({
  name: 'salesData',
  initialState,
  reducers: {
    setSalesData: (state, action: PayloadAction<SalesData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setSalesData } = salesDataSlice.actions;
export default salesDataSlice.reducer;
