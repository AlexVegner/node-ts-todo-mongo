import * as mongoose from 'mongoose';
import { TaskSchema } from '../models/taskModel';
import { Request, Response } from 'express';

const Task = mongoose.model('Tasks', TaskSchema);

export class TaskController{

    public create (req: Request, res: Response) {                
        let newTask = new Task(req.body);
    
        newTask.save((err, task) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(task);
            }
        });
    }

    public getAll(req: Request, res: Response) {           
        Task.find({}).select('-__v').exec((err, tasks) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(tasks);
            }
        });
    }

    public getByID (req: Request, res: Response) {           
        Task.findById(req.params.taskId).select('-__v').exec((err, task) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(task);
            }
        });
    }

    public update (req: Request, res: Response) {           
        Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, (err, task) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(task);
            }
        });
    }

    public delete (req: Request, res: Response) {           
        Task.remove({ _id: req.params.taskId }, (err, contact) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json({ message: 'Successfully deleted contact!'});
            }
        });
    }
    
}
