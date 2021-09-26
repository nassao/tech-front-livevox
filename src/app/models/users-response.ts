export interface UsersResponse {
    "meta": {
        "pagination": UsersResponsePagination
    },
    "data": Array<Users>
}

export interface UsersResponsePagination {
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

export interface Users {
    "id": number,
    "name": string,
    "email": string,
    "gender": string,
    "status": string
}