import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { listGarden, addToGarden, updateEntry, waterEntry, removeEntry, addSchema, updateSchema } from "../controllers/gardenController.js";

const router = Router();

// Everything in here needs a signed-in user, and every handler scopes its queries to that user.
router.use(requireAuth);

router.get("/", listGarden);
router.post("/", validate(addSchema), addToGarden);
router.put("/:id", validate(updateSchema), updateEntry);
router.post("/:id/water", waterEntry);
router.delete("/:id", removeEntry);

export default router;
