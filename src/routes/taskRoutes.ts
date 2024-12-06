import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskDone,
  getTasksDueBefore
} from '../controllers/taskController';

const router = express.Router();

router.post('/task', createTask);
router.get('/task', getTasks);
router.get('/task/:id', getTaskById);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

router.post('/:id/mark-done', markTaskDone);
router.get('/due-before', getTasksDueBefore);

export default router;
