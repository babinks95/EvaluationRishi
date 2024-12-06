import {Request , Response} from "express";
import Tache from "../models/tache";


export const deleteTache = async (req: Request, res: Response): Promise <any> => {
    try {
        const { id } = req.params;
        const tache = await Tache.findByIdAndDelete(id);
        if (!tache) {
            return res.status(404).json({ message: 'Tache not found' });
        }
        res.status(200).json({ message: 'Tache deleted successfully', tache });
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
}

export const getTacheById = async (req: Request, res: Response) => {
    try {
        const tache = await Tache.findById(req.params.id);
        res.status(200).json(tache);
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllTaches = async (req: Request, res: Response) => {
    try {
        const taches = await Tache.find().populate("projectId");
        res.status(200).json(taches);
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
}
export const updateTache = async (req: Request, res: Response): Promise <any> => {
    try {
        const updates = req.body;
        const { id } = req.params;
        const tache = await Tache.findByIdAndUpdate(id, updates, { new: true });

        if (!Tache) {
            return res.status(404).json({ message: 'Tache not found' });
        }

        res.status(200).json({ message: 'Tache updated successfully', tache });
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
}



export const createTache = async (req: Request, res: Response): Promise <any> => {
    try {
        const { projectId, title, done, dueDate } = req.body;

        if (!projectId || !title) {
            res.status(400).json({ message: 'Project ID and title are required' });
            return;
        }

        const newTache = new Tache ({ projectId, title, done, dueDate });
        const savedTache = await newTache.save();

        res.status(201).json({
            message : 'Tache created successfully',
            Tache : savedTache
        })

    } catch (error : any) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Tache already exists' });
        }
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}