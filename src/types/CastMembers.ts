export interface Results {
    data: CastMember[]
    links: Links;
    meta: Meta
}

export interface CastMember {
    id: string;
    name: string;
    type: number;
    deletedAt: null;
    createdAt: string;
    updatedAt: string;
}

export interface Links {
    first: string;
    last: string;
    prev: null;
    next: string;
}

export interface Meta {
    currentPage: number;
    from: number;
    lastPage: number;
    path: string;
    perPage: number;
    to: number;
    total: number;
}

export interface CastMemberParams {
    page?: number;
    perPage?: number;
    search?: string;
    type?: number;
}