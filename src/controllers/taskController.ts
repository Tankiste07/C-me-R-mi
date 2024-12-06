import { Request, Response } from 'express';
import Task from '../models/Task';


// Créer une tâche
export const createTask = async (req: Request, res: Response) :Promise<any> => {
    try {
      const { projectId, title, dueDate } = req.body;
  
      // Vérifier si le projet existe
      const projectExists = await projectId.findById(projectId);
      if (!projectExists) {
        return res.status(404).json({ message: 'Projet introuvable' });
      }
  
      // Créer et sauvegarder la tâche
      const task = new Task({ projectId, title, dueDate });
      const savedTask = await task.save();
  
      res.status(201).json({
        message: 'Tâche créée avec succès',
        task: savedTask
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Erreur lors de la création de la tâche',
        error: error.message
      });
    }
  };;

// Récupérer toutes les tâches
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error });
  }
};

// Récupérer une tâche par son ID
export const getTaskById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la tâche', error });
  }
};

// Mettre à jour une tâche
export const updateTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, description, dueDate, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, { name, description, dueDate, completed }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche', error });
  }
};

// Supprimer une tâche
export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error });
  }
};

// Marquer une tâche comme terminée
export const markTaskDone = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, { completed: true }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche', error });
  }
};

// Récupérer les tâches avant une date limite spécifiée
export const getTasksDueBefore = async (req: Request, res: Response) => {
  const { dueDate } = req.params;  // La date doit être passée en paramètre dans l'URL sous forme de chaîne
  try {
    const tasks = await Task.find({ dueDate: { $lte: new Date(dueDate) } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error });
  }
};
