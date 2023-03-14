import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const cartSchema = new Schema({
    products: {
        type: Array,
        required: true
    }

})

class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "messages", cartSchema)
    }
}

export default ManagerCartMongoDB