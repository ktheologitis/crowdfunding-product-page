import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type ProductType = {
  id: string;
  name: string;
  description: string;
  limit: number;
  stock: number;
};

interface FundingDataState {
  total: number;
  backers: number;
  productIds: string[];
  products: { [key: string]: ProductType };
  selected: string;
}

interface PledgeAddedAction {
  productId: string;
  pledgeAmount: number;
}

const initialState: FundingDataState = {
  total: 24500,
  backers: 5007,
  productIds: ["bamboo", "blackEdition", "mahoganySpecial"],
  products: {
    bamboo: {
      id: "bamboo",
      name: "Bamboo Stand",
      description: "",
      limit: 25,
      stock: 101,
    },
    blackEdition: {
      id: "blackEdition",
      name: "Black Edition Stand",
      description: "",
      limit: 75,
      stock: 64,
    },
    mahoganySpecial: {
      id: "mahoganySpecial",
      name: "Mahogany Special Edition",
      description: "",
      limit: 200,
      stock: 5,
    },
  },
  selected: "none",
};

export const fundingDataSlice = createSlice({
  name: "fundingData",
  initialState,
  reducers: {
    pledgeAdded: (
      state,
      action: PayloadAction<PledgeAddedAction>
    ) => {
      state.total += action.payload.pledgeAmount;
      state.backers += 1;
      if (state.products[action.payload.productId].stock > 0) {
        state.products[action.payload.productId].stock -= 1;
      }
      resetSelection();
    },
    productSelected: (state, action: PayloadAction<string>) => {
      let selectedProductId = action.payload;
      state.selected = selectedProductId;
    },
    resetSelection: (state) => {
      state.selected = "none";
    },
  },
});

export const fundingDataSliceReducer = fundingDataSlice.reducer;

export const { pledgeAdded, productSelected, resetSelection } =
  fundingDataSlice.actions;

export const selectAllProducts = (state: RootState) =>
  state.fundingData.products;

export const selectAllProductIds = (state: RootState) =>
  state.fundingData.productIds;

export const selectProductById =
  (productId: string) => (state: RootState) =>
    state.fundingData.products[productId];

export const selectSelectedProduct = (state: RootState) =>
  state.fundingData.selected;

export const selectTotalAmount = (state: RootState) =>
  state.fundingData.total;

export const selectBackersCount = (state: RootState) =>
  state.fundingData.backers;
