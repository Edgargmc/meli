export class PaginationData {
    total: number
    offset: number
    limit: number

    constructor(total: number, offset: number, limit: number) {
        this.total = total;
        this.offset = offset;
        this.limit = limit;
    }
}
