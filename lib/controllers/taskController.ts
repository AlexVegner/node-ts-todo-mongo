import * as mongoose from 'mongoose';
import { TaskSchema } from '../models/taskModel';
import { Request, Response } from 'express';

const Task = mongoose.model('Tasks', TaskSchema);

export class TaskController{

    public create (req: Request, res: Response) {                
        let newContact = new Task(req.body);
    
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }    
            res.json(contact);
        });
    }

    public getAll(req: Request, res: Response) {           
        Task.find({}).select('-__v').exec((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getByID (req: Request, res: Response) {           
        Task.findById(req.params.taskId).select('-__v').exec((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public update (req: Request, res: Response) {           
        Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public delete (req: Request, res: Response) {           
        Task.remove({ _id: req.params.taskId }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
    
}
