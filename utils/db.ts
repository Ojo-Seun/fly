import mongoose from 'mongoose'
import { productsType, productType } from '../typeScriptTypes'

const connection = {
    isConnected:0
}

const connect = async () => {
    if (connection.isConnected) {
        return
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState
        if (connection.isConnected === 1) {
            return
        }
        await mongoose.disconnect()
    }

    const db = await mongoose.connect(process.env.LOCAL_MONGODB_URL!);

    connection.isConnected = db.connections[0].readyState
}

const disconnect = async () => {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect()
            connection.isConnected  = 0
        } 
    }
}

const convertDocToObj = (doc:any) => {
    doc._id = doc._id.toString()
    return doc
}

    const db = {connect,disconnect, convertDocToObj}
export default db



