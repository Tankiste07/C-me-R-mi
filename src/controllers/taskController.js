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
exports.getTasksDueBefore = exports.markTaskDone = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task")); // Assurez-vous que le modèle Task existe
// Créer une nouvelle tâche
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, dueDate } = req.body;
        const task = new Task_1.default({ name, description, dueDate });
        yield task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la tâche', error });
    }
});
exports.createTask = createTask;
// Récupérer toutes les tâches
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error });
    }
});
exports.getTasks = getTasks;
// Récupérer une tâche par son ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task_1.default.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la tâche', error });
    }
});
exports.getTaskById = getTaskById;
// Mettre à jour une tâche
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, dueDate, completed } = req.body;
    try {
        const task = yield Task_1.default.findByIdAndUpdate(id, { name, description, dueDate, completed }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche', error });
    }
});
exports.updateTask = updateTask;
// Supprimer une tâche
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task_1.default.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json({ message: 'Tâche supprimée avec succès' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error });
    }
});
exports.deleteTask = deleteTask;
// Marquer une tâche comme terminée
const markTaskDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task_1.default.findByIdAndUpdate(id, { completed: true }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche', error });
    }
});
exports.markTaskDone = markTaskDone;
// Récupérer les tâches avant une date limite spécifiée
const getTasksDueBefore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dueDate } = req.params; // La date doit être passée en paramètre dans l'URL sous forme de chaîne
    try {
        const tasks = yield Task_1.default.find({ dueDate: { $lte: new Date(dueDate) } });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error });
    }
});
exports.getTasksDueBefore = getTasksDueBefore;
