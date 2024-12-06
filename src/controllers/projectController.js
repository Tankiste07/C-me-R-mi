"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectsByStatus = exports.completeProject = exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
// Créer un nouveau projet
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({
                message: 'Nom requis'
            });
        }
        const newProject = new Project_1.default({ name, description });
        const saveProject = yield newProject.save();
        res.status(201).json({ message: 'Projet créé', Project: saveProject });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Erreur lors de la création',
            error: error.message
        });
    }
});
exports.createProject = createProject;
// Récupérer tous les projets
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.default.find();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des projets', error });
    }
});
exports.getProjects = getProjects;
// Récupérer un projet par son ID
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findById(req.params.id);
        if (!project)
            return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'obtention du projet via l\'ID', error });
    }
});
exports.getProjectById = getProjectById;
// Mettre à jour un projet
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProject = yield Project_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject)
            return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(updatedProject);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise a jour du projet', error });
    }
});
exports.updateProject = updateProject;
// Supprimer un projet
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProject = yield Project_1.default.findByIdAndDelete(req.params.id);
        if (!deletedProject)
            return res.status(404).json({ error: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppréssion du projet', error });
    }
});
exports.deleteProject = deleteProject;
// Marquer un projet comme complété
const completeProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.default.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
        if (!project)
            return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors du marquage', error });
    }
});
exports.completeProject = completeProject;
// Récupérer les projets par statut (par exemple, 'complété')
const getProjectsByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.params;
    try {
        const projects = yield Project_1.default.find({ completed: status === 'completed' });
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des projets par statut', error });
    }
});
exports.getProjectsByStatus = getProjectsByStatus;
