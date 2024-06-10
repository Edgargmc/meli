export default class Purchase {
    amount?: number;
    cost?: Cost;
    date?: string;
    image?: string;
    purchase_id?: string;
    seller?: Seller;
    shipment_id?: string;
    title?: string;
    transaction_id?: number;

    constructor(data?: Partial<Purchase>) {
        if(data) {
            this.amount = data.amount;
            this.cost = data.cost;
            this.date = data.date;
            this.image = data.image;
            this.purchase_id = data.purchase_id;
            this.seller = data.seller;
            this.shipment_id = data.shipment_id;
            this.title = data.title;
            this.transaction_id = data.transaction_id;
        }
    }

    getDate() {
        const date = new Date(this.date!);
        const day = date.getDate().toString().padStart(2, '0');
        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const month = months[date.getMonth()];
        return `${day} de ${month}`;    }
}


interface Cost {
    currency: string;
    total: number;
}

interface Seller {
    id: number;
    nickname: string;
}