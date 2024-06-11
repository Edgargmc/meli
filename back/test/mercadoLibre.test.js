const request = require('supertest');
const express = require('express');
const MockUserService = require("./utils/MockUserService");
const MercadolibreService = require("../src/services/MercadolibreService");

jest.mock('../src/services/MercadolibreService.js', () => ({
    getUser: jest.fn()
}));


const app = express();

app.get('/profile', async (req, res) => {
    try {
        const user = await MercadolibreService.getUser();
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

describe('GET /profile', () => {
    it('should be return user profile info', async () => {
        const userInfo = MockUserService.getUserMock()
        MercadolibreService.getUser.mockResolvedValue(userInfo);

        const response = await request(app).get('/profile');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(userInfo);
    });

    it('debería manejar errores', async () => {
        MercadolibreService.getUser.mockRejectedValue(new Error('Error al obtener el usuario'));

        const response = await request(app).get('/profile');

        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('Error al obtener el usuario');
    });
});