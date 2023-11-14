import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'https://codeflixadm.bsite.net';

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Categories", "CastMembers"],
    endpoints: (builder) => ({}),
    baseQuery: fetchBaseQuery({ baseUrl })
})