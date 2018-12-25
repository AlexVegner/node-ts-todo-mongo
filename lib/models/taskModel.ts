import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
    name: { type: String, required: 'Enter a first name'},
    created_date: {
        type: Date,
        default: Date.now
    }
});
