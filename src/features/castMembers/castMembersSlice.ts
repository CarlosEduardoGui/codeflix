import { apiSlice } from "../api/apiSlice";
import { CastMemberParams, CastMember } from "../../types/CastMembers";
import { createSlice } from "@reduxjs/toolkit";

const endpoint = "/cast_members";



function parseQueryParams(params: CastMemberParams) {
    return null;
}

export const castMemberApiSlice = apiSlice.injectEndpoints({
    endpoints: () => ({

    })
});
export const initialState: CastMember = {
    id: "",
    name: "",
    type: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: null
};

const castMembersSlice = createSlice({
    name: "castMembers",
    initialState: initialState,
    reducers: {
    },
});

export default castMembersSlice.reducer; 