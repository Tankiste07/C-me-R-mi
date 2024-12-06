import express from 'express';
import { createProject, getProjects ,getProjectById, updateProject, deleteProject, completeProject, getProjectsByStatus
} from '../controllers/projectController';

const router = express.Router();

router.post('/project', createProject);
router.get('/project', getProjects);
router.get('/project/:id', getProjectById);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);

router.post('/:id/complete', completeProject);
router.get('/by-status', getProjectsByStatus);

export default router;
