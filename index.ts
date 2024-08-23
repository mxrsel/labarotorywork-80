import express from "express";
import mysqlDb from "./mysqlDb";
import config from "./config";
import cors from "cors";
import categoriesRouter from "./routers/categories";
import locationsRouter from "./routers/locations";
import itemsRouter from "./routers/items";

const app = express();
const port = 8000;

app.use(cors(config.corsOptions))
app.use(express.json());
app.use (express.static('public'));
app.use ('/categories', categoriesRouter);
app.use ('/locations', locationsRouter)
app.use('/items', itemsRouter)


const run = async () => {
await mysqlDb.init();

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
})
    };

run().catch(console.error)