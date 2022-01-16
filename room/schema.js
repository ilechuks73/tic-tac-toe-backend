const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => new Date().getTime()
  },
  lastActiveAt: {
    type: Date,
    required: true,
    default: () => new Date().getTime()
  }, 
  players: [
    {
      type: String,
      ref: "Players"
    }
  ]
})

module.exports = roomSchema