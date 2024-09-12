const {Schema, model} = require('mongoose');

const StyleSchema = new Schema({
    categoryName: {type: String, required: true, default:''},
    mainColor: {type: String, default:'#D2B48C'},
    secondСolor: {type: String, default:'#45322E'},
    accentColor: {type: String, default:'#FFFFFF'}
})

module.exports = model('Style', StyleSchema);