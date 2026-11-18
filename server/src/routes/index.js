import { Router } from "express";
import authRoutes from "./auth.js";
import gardenRoutes from "./garden.js";
import { listPlants, getPlant } from "../controllers/plantController.js";
import { care, methods, listDIY } from "../controllers/contentController.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/garden", gardenRoutes);

router.get("/plants", listPlants);
router.get("/plants/:slug", getPlant);

router.get("/care", care.list);
router.get("/care/:slug", care.get);

router.get("/methods", methods.list);
router.get("/methods/:slug", methods.get);

router.get("/diy", listDIY);

export default router;
