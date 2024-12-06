"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
router.post('/project', projectController_1.createProject);
router.get('/projects', projectController_1.getProjects);
router.get('/projects/:id', projectController_1.getProjectById);
router.put('/projects/:id', projectController_1.updateProject);
router.delete('/projects/:id', projectController_1.deleteProject);
router.post('/:id/complete', projectController_1.completeProject);
router.get('/by-status', projectController_1.getProjectsByStatus);
exports.default = router;
