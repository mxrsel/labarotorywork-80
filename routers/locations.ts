import express from "express";
import mysqlDb from "../mysqlDb";
import {Location, LocationMutation} from "../types";
import {ResultSetHeader} from "mysql2";

const locationsRouter = express.Router();

locationsRouter.get('/', async(req, res) => {
    try{
        const result = await mysqlDb.getConnection().query(
            'SELECT * FROM locations'
        );

        const locations = result[0] as Location[];
        return res.send(locations)
    } catch(e) {
        return res.status(500).send({e:'Server Error'})
    }
});

locationsRouter.get('/:id', async (req, res) => {
    const locationId = parseInt(req.params.id);

    if (isNaN(locationId)) {
        return res.status(400).send({ e: 'Invalid ID'});
    }

    try {
        const result = await mysqlDb.getConnection().query(
            'SELECT * FROM locations WHERE id = ?',
            [locationId]
        );

        const locations = result[0] as Location[];

        if(locations.length === 0) {
            return res.status(404).send({ e: 'Location not found'});

        }
        return res.send(locations[0]);
    }catch (e) {
        return res.status(500).send({e: 'Server Error'})
    }
});

locationsRouter.post('/', async(req, res) => {
    if (!req.body.name) {
        return res.status(400).send({e: 'Name is required'});
    }

    const location: LocationMutation = {
        name: req.body.name,
        description: req.body.description,
    };

    try {
        const result = await mysqlDb.getConnection().query(
            'INSERT INTO locations (name, description) VALUES (?, ?)',
            [location.name, location.description]
        );

        const resultHeader = result[0] as ResultSetHeader;

        const getNewResult = await mysqlDb.getConnection().query(
            'SELECT * FROM locationsWHERE id = ?',
            [resultHeader.insertId]
        );

        const locations = getNewResult[0] as Location[];

        return res.send(locations[0]);
    } catch (e) {
        res.status(500).send({e: 'Server error'});
    }
});

export default locationsRouter