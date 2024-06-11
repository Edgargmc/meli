const request = require('supertest');  // Import SuperTest
const app = require('../src/app');
const MercadolibreService = require('../src/services/MercadolibreService.js');
const MockUserService = require("./utils/MockUserService"); // Assuming mocks.js defines getUser

jest.mock('../src/services/MercadolibreService.js');

describe('GET /api/user/profile', () => {

    it('should return user profile', async () => {
        MercadolibreService.prototype.getUser.mockImplementation(() => {
            return Promise.resolve(userMock);
        });

        const response = await request(app).get('/api/user/profile');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(userMock);
    });

    it('should return user restrictions', async () => {
        MercadolibreService.prototype.getUserRestrictions.mockImplementation(() => {
            return Promise.resolve(userRestrictions);
        });

        const response = await request(app).get('/api/user/restrictions/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(userRestrictions);
    });

    it('should handle error 500, getting profile', async () => {
        const error = new Error('Error de prueba');
        MercadolibreService.prototype.getUser.mockImplementationOnce(() => {
            return Promise.reject(error);
        });

        const response = await request(app).get('/api/user/profile');

        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('Error de prueba');
    });

    it('should return user purchases', async () => {
        MercadolibreService.prototype.getUserPurchases.mockImplementationOnce(() => {
            return Promise.resolve(userPurchases);
        });

        const response = await request(app).get('/api/user/purchases/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(userPurchases);
    });

   it.each([
        { page: 1, limit: 1, expectedOffset: 0 },
        { page: 2, limit: 1, expectedOffset: 1 },
    ])('should handle pagination for page $page and limit $limit', async ({page, limit, expectedOffset }) => {
       const offset =  (page - 1) * limit;

       MercadolibreService.prototype.getUserPurchases.mockImplementation(() => {
            return Promise.resolve(getItems(limit, offset));
        })

       let response = await request(app).get(`/api/user/purchases/1?limit=${limit}&page=${page}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(await getItems(limit, offset));
       expect(response.body.offset).toBe(expectedOffset);
   });


    let userMock
    let userRestrictions
    let userPurchases

    beforeEach(() => {
        MercadolibreService.mockClear();
        userMock = MockUserService.getUserMock()
        userRestrictions = MockUserService.getUserRestrictions()
        userPurchases = MockUserService.getUserPurchases()
        MercadolibreService.prototype.getUserPurchases.mockImplementation(() => {
            return Promise.resolve(getItems(limit, offset));
        })
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const purchases =  [
        { purchase_id: 1, title: 'Item 1' },
        { purchase_id: 2, title: 'Item 2' },
        { purchase_id: 3, title: 'Item 3' },
        { purchase_id: 4, title: 'Item 4' },
        { purchase_id: 5, title: 'Item 5' },
    ];

    const getItems = (limit, offset) => {
        limit = Number(limit);
        offset = Number(offset);
        return {
            total: purchases.length,
            offset: offset,
            limit: limit,
            data: purchases.slice(offset, offset + limit)
        };
    }
});

