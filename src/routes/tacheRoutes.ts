import { Router } from "express";

import {
    createTache,
    getAllTaches,
    getTacheById,
    updateTache,
    deleteTache

} from "../controllers/tacheController";

const router = Router();
router.post("/", createTache);
router.get("/", getAllTaches);
router.get("/:id", getTacheById);
router.put("/:id", updateTache);
router.delete("/:id", deleteTache);

export default router;


