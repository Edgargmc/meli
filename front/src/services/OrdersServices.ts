import axios, {AxiosResponse} from "axios";
import {ShipmentDetails} from "../models/ShipmentDetails.ts";
import {PaymentDetails} from "../models/PaymentDetails.ts";

export default class OrdersServices {
    private baseUrl: string = 'http://localhost:3000/api/orders';

    async getShipment(shipmentId: string) {
        const response:AxiosResponse<ShipmentDetails> =  await axios.get(`${this.baseUrl}/shipment/${shipmentId}`)
        return response.data
    }

    async getPayment(transactionId: number) {
        const response: AxiosResponse<PaymentDetails> = await axios.get(`${this.baseUrl}/payment/${transactionId}`);
        return response.data
    }
}