export interface UserResponse {
    meta: {
        pagination?: UserResponsePagination;
    };
    data: User | Array<User>;
}

export interface UserResponsePagination {
    total: number;
    pages: number;
    page: number;
    limit: number;
    links: {
        previous: string | null;
        current: string | null;
        next: string | null;
    }
}

export interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
    field?: string;
    message?: string;
}

export interface UserQuery {
    name?: string;
    page?: number;
}