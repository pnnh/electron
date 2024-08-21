import {NextRequest} from "next/server";

export interface Pagination {
    offset: number
    limit: number
    page: number
    size: number
}

export function createPagination(offset: number, limit: number): Pagination {
    return {
        offset,
        limit,
        page: Math.floor(offset / limit) + 1,
        size: limit
    }
}

export function createPaginationByPage(page: number, limit: number): Pagination {
    return {
        offset: (page - 1) * limit,
        limit,
        page,
        size: limit
    }
}

export function fromNextRequest(request: NextRequest) {
    const queryPage = request.nextUrl.searchParams.get('page')
    const querySize = request.nextUrl.searchParams.get('size')
    const page = isNaN(Number(queryPage)) ? 1 : Number(queryPage)
    const size = isNaN(Number(querySize)) ? 10 : Number(querySize)
    return createPaginationByPage(page, size)
}
