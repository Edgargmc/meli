import axios, {AxiosResponse} from "axios";
import Purchase from "../models/Purchase.ts";
import {PaginationData} from "../models/PaginationData.ts";

export default class UsersServices {
    private baseUrl: string = 'http://localhost:3000/api/user';

    getProfile() {
        return axios.get(`${this.baseUrl}/profile`);
    }

    getRestrictions(userid: number) {
        return axios.get(`${this.baseUrl}/restrictions/${userid}`);
    }

    async getPurchases(userid: number, page: number, limit:number): Promise<{ paginationData: PaginationData; purchases: Purchase[]}> {
        const response: AxiosResponse<PurchaseResponse> = await axios.get(`${this.baseUrl}/purchases/${userid}?limit=${limit}&page=${page}`);
        const purchases = response.data.data.map((purchase) => {
            return new Purchase(purchase);
        });
        const paginationData: PaginationData = new PaginationData(response.data.total, response.data.offset, response.data.limit);
        return {
            purchases,
            paginationData,
        };
    }
}

interface PurchaseResponse {
    data: Purchase[];
    total: number;
    offset: number;
    limit: number;
}