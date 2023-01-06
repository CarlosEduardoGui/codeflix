import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  update_at: string;
  delete_at: null | string;
  description: null | string;
}

const category: Category = {
  id: "1234-1234-1234",
  name: "Action",
  description: "Very action by John",
  is_active: true,
  delete_at: null,
  created_at: "2022-08-15T10:59:09+0000",
  update_at: "2022-08-15T10:59:09+0000",
};

export const initialState = [
  category,
  { ...category, id: "234-234-234", name: "Peach" },
  { ...category, id: "345-456-456", name: "Apple" },
  { ...category, id: "165-165-165", name: "Banana" },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    createCategory(state, action) { },
  },
});

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
