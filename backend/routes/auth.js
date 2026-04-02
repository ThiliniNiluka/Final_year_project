import express from "express";

import {z} from "zod";
import { validateRequest } from "zod-express-middleware";
import { registerSchema } from "../libs/validate-schema";

const router = express.Router();

// your routes
router.post(
  "/register", 
  validateRequest({
  body: registerSchema
}),
  async (req, res) => {}
);
