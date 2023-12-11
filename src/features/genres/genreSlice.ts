import { Results } from "../../types/Category";
import { Genre, GenreParams, GenrePayload } from "../../types/Genre";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/genres";

export const initialState = {
    id: "",
    name: "",
    created_at: "",
    updated_at: "",
    deleted_at: null,
    isActive: false,
    categories: [],
    description: "",
    pivot: { genre_id: "", category_id: "" }
}

function parseQueryParams(params: GenreParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.perPage) {
        query.append("per_page", params.perPage.toString());
    }

    if (params.search) {
        query.append("search", params.search);
    }

    if (params.isActive) {
        query.append("is_active", params.isActive.toString());
    }

    return query.toString();
}

function createGenreMutation(genre: GenrePayload) {
    return {
        url: endpointUrl,
        method: "POST",
        body: genre
    }
}

function getCategories() {
    return "categories?all=true"
}

export const genresApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCategories: query<Results, void>({
            query: getCategories,
        }),
        createGenre: mutation<Genre, GenrePayload>({
            query: createGenreMutation,
            invalidatesTags: ["Genres"]
        }),
    }),
});


export const {
    useCreateGenreMutation,
    useGetCategoriesQuery
} = genresApiSlice;