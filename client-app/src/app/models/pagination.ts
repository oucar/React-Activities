export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    data: T;
    pagination: Pagination;

    constructor(data: T, pagination: Pagination) {
        this.data = data;
        this.pagination = pagination;
    }
}

// Parameters required for the pagination of the data (Lists, etc.)
export class PagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = 5) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}