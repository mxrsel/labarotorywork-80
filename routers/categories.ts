import express from "express";
import mysqlDb from "../mysqlDb";
import {Category, CategoryMutation} from "../types";
import {ResultSetHeader} from "mysql2";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res, next) => {
    try {
        const result = await mysqlDb.getConnection().query(
            'SELECT * FROM categories'
        );
        const categories = result[0] as Category[];
        return res.send(categories);
    } catch (e) {
        next(e)
    }
});

categoriesRouter.get('/:id', async (req, res, next) => {
        const id = req.params.id;
    try {
        const result = await mysqlDb.getConnection().query(
            'SELECT * FROM categories WHERE id = ?',
            [id]
        );
        const categories = result[0] as Category[];

        if (categories.length > 0) {
            return res.status(404).send({error: 'Category not found'});
        }
        return res.send(categories[0]);
    }catch (e) {
        next(e)
    }
});

categoriesRouter.post('/', async (req, res, next) => {

        if (!req.body.name) {
            return res.status(400).send({error: 'Name is required'});
        }

        const category: CategoryMutation = {
            name: req.body.name,
            description: req.body.description,
        };
        try {
        const insertResult = await mysqlDb.getConnection().query(
            'INSERT INTO categories (name, description) VALUES (?, ?)',
            [category.name, category.description],
        );

        const resultHeader = insertResult[0] as ResultSetHeader

        const getNewResult = await mysqlDb.getConnection().query(
            'SELECT * FROM categories WHERE id = ?',
            [resultHeader.insertId]
        );

        const categories = getNewResult[0] as Category[]
        return res.send(categories[0]);
    }catch (e) {
        next(e)
    }

});

export default categoriesRouter
