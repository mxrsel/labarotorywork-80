import express from "express";
import mysqlDb from "../mysqlDb";
import {Category} from "../types";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    const result = await mysqlDb.getConnection().query(
        'SELECT * FROM categories'
    );
    const categories = result[0] as Category[];
   return res.send(categories);
});

categoriesRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await mysqlDb.getConnection().query(
        'SELECT * FROM categories WHERE id = ?',
        [id]
    );
    const categories = result[0] as Category[];

    if(categories.length > 0){
        return res.status(404).send({error: 'Category not found'});
    }

    return res.send(categories[0]);
});

