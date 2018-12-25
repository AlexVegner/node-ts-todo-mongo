import {Router, Request, Response, NextFunction} from "express";

import { TaskController } from "./controllers/taskController";

export class Routes { 

    public taskController: TaskController = new TaskController() 
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })

        const api = Router();
        app.use('/api', api);

        const v1 = Router();
        api.use('/v1', v1);

        // Tasks 
        v1.route('/tasks')
            .get((req: Request, res: Response, next: NextFunction) => {
                // middleware
                console.log(`Request from: ${req.originalUrl}`);
                console.log(`Request type: ${req.method}`);  
                next();          
                // if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
                //     res.status(401).send('You shall not pass!');
                // } else {
                //     next();
                // }                        
            }, this.taskController.getAll)        

        // POST endpoint
        .post(this.taskController.create);

        // Contact detail
        v1.route('/tasks/:taskId')
            // get specific contact
            .get(this.taskController.getByID)
            .put(this.taskController.update)
            .delete(this.taskController.delete)

    }
}