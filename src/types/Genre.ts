import { Category } from "./Category";

export interface Genres {
    data: Genre[];
    links: Links;
    meta: Meta;
}

export interface Result {
    data: Genre;
    meta: Meta;
    links: Links;
}

export interface Genre {
    id: string;
    name: string;
    isActive: boolean;
    deleted_at: null;
    created_at: string;
    updated_at: string;
    categories?: Category[];
    description?: string;
    pivot?: Pivot;
}

export interface Pivot {
    genre_id: string;
    category_id: string;
}

export interface GenreParams {
    page?: number;
    perPage?: number;
    search?: string;
    isActive?: boolean;
}

export interface GenrePayload {
    id: string;
    name: string;
    categories_id?: string[];
}

export interface Links {
    prev: string;
    last: string;
    next: string;
    first: string;
}

export interface Meta {
    to: number;
    from: number;
    path: string;
    total: number;
    per_page: number;
    last_page: number;
    current_page: number;
}