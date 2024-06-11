import { useState, useEffect } from 'react';
import OrdersServices from "../services/OrdersServices.ts";
import {ShipmentDetails} from "../models/ShipmentDetails.ts";
import {PaymentDetails} from "../models/PaymentDetails.ts";
import Purchase from "../models/Purchase.ts";

export const usePurchaseDetails = (purchase: Purchase, open: boolean) => {
    const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails>()
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error| null>()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            const ordersService = new OrdersServices();
            try {
                const [shipment, payment] = await Promise.all([
                    ordersService.getShipment(purchase.shipment_id!),
                    ordersService.getPayment(purchase.transaction_id!)
                ]);
                setShipmentDetails(shipment);
                setPaymentDetails(payment);
            } catch (error) {
                console.error(error);
                // eslint-disable-next-line
                // @ts-ignore
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (open) {
            fetchData();
        }
    }, [purchase, open]);

    return { shipmentDetails, paymentDetails, isLoading, error };
};
