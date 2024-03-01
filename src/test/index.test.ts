// test/index.test.ts
import {describe, expect, it, mock, spyOn} from 'bun:test';
import {Elysia} from 'elysia';
import {CupcakeService} from 'services/Cupcake';

describe('Cupcake endpoints', () => {
    const app = new Elysia();

    app.get('/api/cupcake', () => CupcakeService.getCupcakes());

    it('GET / should return all cupcakes', async () => {
        const getCupcakesMock = spyOn(CupcakeService, 'getCupcakes');
        getCupcakesMock.mockResolvedValue([
            {
                id: 1,
                name: 'Chocolate',
                description: 'Yummy Choco cupcake',
                price: 3.5,
                ingredients: ['Flour', 'Sugar'],
            },
            {
                id: 2,
                name: 'Vanilla',
                description: 'Delicious vanilla cupcake',
                price: 2.5,
                ingredients: ['Flour', 'Sugar'],
            },
        ]);
        const response = await app.handle(
            new Request('http://localhost/api/cupcake')
        );

        expect(response.status).toBe(200);

        getCupcakesMock.mockRestore();
    });

    it('GET /api/cupcake/:id should return a specific cupcake', async () => {
        const getCupcakeMock = spyOn(
            CupcakeService,
            'getCupcake'
        ).mockResolvedValue({
            id: 1,
            name: 'Chocolate',
            description: 'Yummy Choco cupcake',
            price: 3.5,
            ingredients: ['Flour', 'Sugar'],
        });

        const response = await app.handle(
            new Request('http://localhost/api/cupcake/1')
        );
        expect(response.status).toBe(200); // Verify the status code

        getCupcakeMock.mockRestore();
    });

    it('POST /api/cupcake should add a new cupcake', async () => {
        const addCupcakeMock = spyOn(
            CupcakeService,
            'addCupcake'
        ).mockResolvedValue({
            payload: {
                id: 3,
                name: 'Red Velvet',
                description: 'Delightful Red Velvet cupcake',
                price: 4.0,
                ingredients: ['Flour', 'Cocoa', 'Buttermilk'],
            },
            code: 200,
        });

        const requestBody = {
            name: 'Red Velvet',
            description: 'Delightful Red Velvet cupcake',
            price: 4.0,
            ingredients: ['Flour', 'Cocoa', 'Buttermilk'],
        };

        const response = await app.handle(
            new Request('http://localhost/api/cupcake', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {'Content-Type': 'application/json'},
            })
        );
        expect(response.status).toBe(200); // Verify the status code

        addCupcakeMock.mockRestore();
    });
    it('PATCH /api/cupcake/:id should update a cupcake', async () => {
        const updateCupcakeMock = spyOn(
            CupcakeService,
            'updateCupcake'
        ).mockResolvedValue({
            id: 1,
            name: 'Updated Cupcake',
            description: 'Updated cupcake description',
            price: 4.0,
            ingredients: ['Flour', 'Cocoa', 'Buttermilk'],
        });

        // Add your test logic similar to the addCupcake test, adjusting for PATCH semantics

        updateCupcakeMock.mockRestore();
    });
    it('DELETE /api/cupcake/:id should delete a cupcake', async () => {
        const deleteCupcakeMock = spyOn(
            CupcakeService,
            'deleteCupcake'
        ).mockResolvedValue(undefined);

        // Add your test logic, focusing on the DELETE operation

        deleteCupcakeMock.mockRestore();
    });
});
