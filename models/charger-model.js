const mongoose = require("../db/connection")

const LocationSchema = new mongoose.Schema(
    {
        locationID: Number,
        title: {
            type: String,
            unique: true
        },
        addressLine1: { type: String },
        town: { type: String },
        postcode: { type: String },
        lat: {
            type: Number,
            required: true,
            unique: true
        },
        lon: {
            type: Number,
            required: true,
            unique: true
        },
        telephone: String,
        numberOfChargers: Number,
        availableChargers: Number,
        rating: Number,
        statusType: {
            isOperational: Boolean,
            isUserSelectable: Boolean,
            title: String
        },
        usage: {
            cost: Number,
            isPayAtLocation: Boolean,
            title: String,
            numOfChargersAvailable: { type: Number, minimum: 0 }
        }
    }
)

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location