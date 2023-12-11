import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.REACT_APP_API_URL;

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Categories", "CastMembers", "Genres"],
    endpoints: (builder) => ({}),
    baseQuery: fetchBaseQuery({ baseUrl })
})