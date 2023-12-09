import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.API_URL;

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Categories", "CastMembers"],
    endpoints: (builder) => ({}),
    baseQuery: fetchBaseQuery({ baseUrl })
})