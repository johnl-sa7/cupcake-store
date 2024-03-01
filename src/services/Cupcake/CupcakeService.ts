import {NotFoundError} from 'elysia';

import db from 'db';
import Service from 'services/Service';

interface cupcakeOptions {
    name: string;
    description: string;
    price: number;
    ingredients: Array<string>;
}
/**
 * Returns a list of available cupcakes
 * @summary List all cupcakes
 * @param {*} [options] Override http request options.
 */
export async function getCupcakes() {
    try {
        return await db.cupcake.findMany({orderBy: {id: 'asc'}});
    } catch (err) {
        console.log(`Error getting cupcakes: ${err}`);
    }
}

/**
 * Returns a single cupcake
 * @summary Find cupcake by ID
 * @param cupcakeId ID of cupcake to return
 * @param {*} [options] Override http request options.
 */
export async function getCupcake(id: number) {
    try {
        const cupcake = await db.cupcake.findUnique({where: {id}});

        if (!cupcake) {
            throw new NotFoundError('Cupcake not found');
        }

        return cupcake;
    } catch (err) {
        console.error(`Error finding cupcake: ${err}`);
    }
}

/**
 *
 * @summary Add a new cupcake to the store
 * @param body Cupcake object that needs to be added to the store
 * @param {*} [options] Override http request options.
 */
export async function addCupcake(options: cupcakeOptions) {
    const {name, description, price, ingredients} = options;
    try {
        const result = await db.cupcake.create({
            data: {name, description, price, ingredients},
        });
        return Service.successResponse(result);
    } catch (e: unknown) {
        throw Service.rejectResponse(
            (e as {message: string; status?: number}).message ||
                'Invalid input',
            (e as {message: string; status?: number}).status || 405
        );
    }
}

/**
 *
 * @summary Update an existing cupcake
 * @param cupcakeId ID of cupcake that needs to be updated
 * @param body Updated cupcake object
 * @param {*} [options] Override http request options.
 */
export async function updateCupcake(
    id: number,
    body: {
        name?: string;
        description?: string;
        price?: number;
        ingredients?: Array<string>;
    }
) {
    try {
        const {name, description, price, ingredients} = body;

        return await db.cupcake.update({
            where: {id},
            data: {
                ...(name ? {name} : {}),
                ...(description ? {description} : {}),
                ...(price ? {price} : {}),
                ...(ingredients ? {ingredients} : {}),
            },
        });
    } catch (err) {
        console.error(`Error updating cupcake: ${err}`);
    }
}

/**
 *
 * @summary Deletes a cupcake
 * @param cupcakeId Cupcake id to delete
 * @param {*} [options] Override http request options.
 */
export async function deleteCupcake(id: number) {
    try {
        return await db.cupcake.delete({where: {id}});
    } catch (err: unknown) {
        console.error(`Error deleting cupcake: ${err}`);
    }
}
