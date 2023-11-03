import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'http://localhost:8000/api';

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Categories"],
    endpoints: (builder) => ({}),
    baseQuery: fetchBaseQuery({ baseUrl })
})