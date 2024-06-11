class MockUserService {
    static getUserMock() {
        return {
            "user_id": 1,
            "name": "Mercadolibre",
            "level": "ORO",
        };
    }

    static getUserRestrictions() {
        return [
            {
                "type": "warning",
                "message": "Tu cuenta no ha sido verificada aún. Revisa tu mail"
            }
        ]
    }

    static getUserPurchases() {
        return {
            "total": 10,
            "offset": 0,
            "limit": 10,
            "data": [
                {
                    "purchase_id": 300200,
                    "title": "Celular LG K40",
                    "cost": {
                        "total": 105000,
                        "currency": "ARS"
                    },
                    "amount": 3,
                    "date": "2022-07-25T10:23:18.000-03:00",
                    "image": "https://http2.mlstatic.com/D_NQ_NP_969645-MLA46877067884_072021-V.webp",
                    "seller": {
                        "id": 4010,
                        "nickname": "FAROCUDR19"
                    },
                    "transaction_id": 7010200,
                    "shipment_id": 1000010200
                }]
        }
    }
}


module.exports = MockUserService;