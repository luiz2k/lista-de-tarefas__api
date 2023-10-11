import { Router } from 'express';

import taskControllers from '../controllers/taskControllers';

const taskRouter = Router();

taskRouter.get('/', taskControllers.getAllTasks);
taskRouter.post('/create', taskControllers.createTask);
taskRouter.get('/find/:id', taskControllers.findTask);
taskRouter.patch('/edit/:id', taskControllers.editTask);
taskRouter.patch('/changeStatus/:id', taskControllers.changeStatus);
taskRouter.delete('/delete/:id', taskControllers.deleteTask);

export default taskRouter;
