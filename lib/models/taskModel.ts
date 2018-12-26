import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
    name: { type: String, required: 'Enter a first name'},
    createdDate: {
        type: Date,
        default: Date.now
    }
});
