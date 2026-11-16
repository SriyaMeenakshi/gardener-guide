import { Router } from "express";
import { listPlants, getPlant } from "../controllers/plantController.js";
import { care, methods, listDIY } from "../controllers/contentController.js";

const router = Router();

router.get("/plants", listPlants);
router.get("/plants/:slug", getPlant);

router.get("/care", care.list);
router.get("/care/:slug", care.get);

router.get("/methods", methods.list);
router.get("/methods/:slug", methods.get);

router.get("/diy", listDIY);

export default router;
