import { Request, Response } from 'express';
import Project from '../models/Project';

// Créer un nouveau projet
export const createProject = async (req: Request, res: Response): Promise<any> => {
    try {
    const {name, description} = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Nom requis'
        })
    }
    const newProject = new Project({name, description});
    const saveProject = await newProject.save();
    res.status(201).json({message: 'Projet créé', Project: saveProject})
}
    catch (error: any) {
        return res.status(500).json({
            message: 'Erreur lors de la création',
            error: error.message
        })
}}

// Récupérer tous les projets
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des projets', error });
  }
};

// Récupérer un projet par son ID
export const getProjectById = async (req: Request, res: Response): Promise<any> => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ error: 'Project not found' });
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({message: 'Erreur lors de l\'obtention du projet via l\'ID', error});
    }
  };

// Mettre à jour un projet
export const updateProject = async (req: Request, res: Response): Promise<any> => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json({message: 'Erreur lors de la mise a jour du projet', error});
    }
  };

// Supprimer un projet
export const deleteProject = async (req: Request, res: Response): Promise<any> => {
    try {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
      if (!deletedProject) return res.status(404).json({ error: 'Project not found' });
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({message: 'Erreur lors de la suppréssion du projet', error});
    }
  };

// Marquer un projet comme complété
export const completeProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({message: 'Erreur lors du marquage', error});
  }
};

// Récupérer les projets par statut (par exemple, 'complété')
export const getProjectsByStatus = async (req: Request, res: Response) => {
  const { status } = req.params;
  try {
    const projects = await Project.find({ completed: status === 'completed' });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des projets par statut', error });
  }
};
