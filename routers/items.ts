import express from "express";
import mysqlDb from "../mysqlDb";
import {Item, ItemMutation} from "../types";
import {ResultSetHeader} from "mysql2";

const itemsRouter = express.Router();

itemsRouter.get('/', async(req, res) => {
    try{
        const result = await mysqlDb.getConnection().query(
            'SELECT * FROM items'
        );

        const items = result[0] as Item[];
        return res.send(items);
    }catch (e) {
        return res.status(500).send({ e: 'Server Error'});
    }
});

itemsRouter.get('/:id', async(req, res)=> {
    const itemId = parseInt(req.params.id);
    if (isNaN(itemId)){
        return res.status(400).send({error: 'Invalid Id'});
    }

    try{
        const result = await mysqlDb.getConnection().query(
            'SELECT * FROM item WHERE id= ?',
            [itemId]
        );

        const items = result[0] as Item[];

        if (items.length === 0) {
            return res.status(404).send({error: 'Item not found'})
        }

        return res.send(items[0]);
    }catch (e) {
        res.status(500).send({e: 'Server Error'});
    }
});

itemsRouter.post('/', async(req, res) => {
    if(!req.body.category_id || req.body.location_id || !req.body.name) {
        return res.status(404).send({error: 'Category ID, Location ID and Name are required'});
    }

    const item: ItemMutation = {
        category_id: req.body.category_id,
        location_id: req.body.location_id,
        name: req.body.name,
        description: req.body.description,
        photo: req.body.photo,
    };

    try {
        const result = await mysqlDb.getConnection().query(
            'INSERT INTO items (category_id, location_id, name, description, photo) VALUES (?, ?, ?, ?, ?)',
            [item.category_id, item.location_id, item.name, item.description, item.photo]
        );
        const resultHeader = result[0] as ResultSetHeader;
        const getNewResult = await mysqlDb.getConnection().query('' +
            'SELECT * FROM items WHERE id = ?',
            [resultHeader.insertId]
        );

        const items = getNewResult[0] as Item[];

        return res.send(items[0]);
    }catch (e) {
        res.status(500).send({ e: 'Server Error'});
    }
});

export default itemsRouter