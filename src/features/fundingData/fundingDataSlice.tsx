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
  backed: number;
  backers: number;
  productIds: string[];
  products: { [key: string]: ProductType };
  selected: string;
}

interface PledgeAddedAction {
  productId?: string;
  pledgeAmount: number;
}

const initialState: FundingDataState = {
  backed: 24500,
  backers: 5007,
  productIds: ["bamboo", "blackEdition", "mahoganySpecial"],
  products: {
    bamboo: {
      id: "bamboo",
      name: "Bamboo Stand",
      description:
        "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
      limit: 25,
      stock: 101,
    },
    blackEdition: {
      id: "blackEdition",
      name: "Black Edition Stand",
      description:
        "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
      limit: 75,
      stock: 64,
    },
    mahoganySpecial: {
      id: "mahoganySpecial",
      name: "Mahogany Special Edition",
      description:
        "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
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
      if (action.payload.productId) {
        console.log(
          "New pledge amount: " + action.payload.pledgeAmount
        );
        state.backed += action.payload.pledgeAmount;
        if (state.products[action.payload.productId].stock > 0) {
          state.products[action.payload.productId].stock -= 1;
        }
      }
      state.backers += 1;
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

// Export Selectors
export const selectAllProducts = (state: RootState) =>
  state.fundingData.products;

export const selectAllProductIds = (state: RootState) =>
  state.fundingData.productIds;

export const selectProductById =
  (productId: string) => (state: RootState) =>
    state.fundingData.products[productId];

export const selectSelectedProduct = (state: RootState) =>
  state.fundingData.selected;

export const selectBackedAmount = (state: RootState) =>
  state.fundingData.backed;

export const selectBackersCount = (state: RootState) =>
  state.fundingData.backers;

export const selectProductStock =
  (productId: string) => (state: RootState) =>
    state.fundingData.products[productId].stock;
