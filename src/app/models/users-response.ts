export interface UserResponse {
    "meta": {
        "pagination"?: UserResponsePagination
    },
    "data": Array<User>
}

export interface UserResponsePagination {
    "total": number,
    "pages": number,
    "page": number,
    "limit": number,
    "links": {
        "previous": string | null,
        "current": string | null,
        "next": string | null
    }
}

export interface User {
    "id": number,
    "name": string,
    "email": string,
    "gender": string,
    "status": string
}