import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { Results, Result, CategoryParams } from "../../types/Category";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  description: null | string;
}

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams) {
  const queryParams = new URLSearchParams();

  if (params.page) {
    queryParams.append('page', params.page.toString());
  }

  if (params.perpage) {
    queryParams.append('perPage', params.perpage.toString());
  }

  if (params.search) {
    queryParams.append('search', params.search.toString());
  }

  if (params.isActive) {
    queryParams.append('isActive', params.isActive.toString());
  }

  return queryParams.toString();
}

function getCategories({ page = 1, perPage = 10, search = '' }) {
  const params = { page, perPage, search, isActive: true };

  return `${endpointUrl}/?${parseQueryParams(params)}`
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE"
  }
}

function createCategoryMutation(category: Category) {
  return {
    url: endpointUrl,
    method: "POST",
    body: category
  }
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category
  }
}

function getCategoryById({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategoryById: query<Result, { id: string }>({
      query: getCategoryById,
      providesTags: ["Categories"]
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"]
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"]
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"]
    })
  }),
});

const category: Category = {
  id: "1234-1234-1234",
  name: "Action",
  description: "Very action by John",
  is_active: true,
  deleted_at: null,
  created_at: "2022-08-15T10:59:09+0000",
  updated_at: "2022-08-15T10:59:09+0000",
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
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex((category) => category.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      const index = state.findIndex((category) => category.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);

  return category || {
    id: "",
    name: "",
    description: "",
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: null
  };
}

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation
} = categoriesApiSlice