import { CastMemberParams, CastMember, Results, Result } from "../../types/CastMembers";
import { apiSlice } from "../api/apiSlice";

const endpoint = "/cast_members";

export const initialState: CastMember = {
    id: "",
    name: "",
    type: 1,
    created_at: "",
    updated_at: "",
    deleted_at: null
}

function parseQueryParams(params: CastMemberParams) {
    const queryParams = new URLSearchParams();

    if (params.page) {
        queryParams.append('page', params.page.toString());
    }

    if (params.perPage) {
        queryParams.append('perPage', params.perPage.toString());
    }

    if (params.search) {
        queryParams.append('search', params.search.toString());
    }

    if (params.type) {
        queryParams.append('type', params.type.toString());
    }

    return queryParams.toString();
}

function createCastMember(castMember: CastMember) {
    return {
        url: endpoint,
        method: 'POST',
        body: castMember
    }
}

function getCastMembers(params: CastMemberParams) {
    const { page = 1, perPage = 10, search, type } = params;

    return `${endpoint}?${parseQueryParams({
        page,
        perPage,
        search,
        type
    })}`;
}

function getCastMember({ id }: { id: string }) {
    return {
        url: `${endpoint}/${id}`,
        method: 'GET'
    }
}

function updateCastMember(castMember: CastMember) {
    return {
        url: `${endpoint}/${castMember.id}`,
        method: 'PUT',
        body: castMember
    }
}

function deleteCastMember({ id }: { id: string }) {
    return {
        url: `${endpoint}/${id}`,
        method: 'DELETE'
    }
}

export const castMemberApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCastMembers: query<Results, CastMemberParams>({
            query: getCastMembers,
            providesTags: ["CastMembers"]
        }),
        getCastMemberById: query<Result, { id: string }>({
            query: getCastMember,
            providesTags: ["CastMembers"]
        }),
        deleteCastMember: mutation<Result, { id: string }>({
            query: deleteCastMember,
            invalidatesTags: ["CastMembers"]
        }),
        createCastMember: mutation<Result, CastMember>({
            query: createCastMember,
            invalidatesTags: ["CastMembers"]
        }),
        updateCastMember: mutation<Result, CastMember>({
            query: updateCastMember,
            invalidatesTags: ["CastMembers"]
        })
    })
});

export const {
    useGetCastMembersQuery,
    useGetCastMemberByIdQuery,
    useDeleteCastMemberMutation,
    useUpdateCastMemberMutation,
    useCreateCastMemberMutation
} = castMemberApiSlice;