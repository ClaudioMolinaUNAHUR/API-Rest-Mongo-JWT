import { Router } from "express";
import { createLink, getLinks, getLink, removeLink, updateLink } from "../controllers/link.controller.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validationResultExpress.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = Router();

//GET       /api/v1/links       all links
//GET       /api/v1/links/:id   single link
//POST      /api/v1/links       create link
//PATCH/PUT /api/v1/links/:id   update links
//DELETE    /api/v1/links/:id   remove links

router.get("/", verifyToken, getLinks)
//router.get("/:id", verifyToken, getLinkCRUD) para CRUD tradicional si se pide Token
router.get("/:nanoLink", getLink) // el get con un nano deberia se publico
router.post("/", verifyToken, bodyLinkValidator, createLink)
router.delete("/:id", verifyToken, paramsLinkValidator, removeLink)
router.patch("/:id", verifyToken, paramsLinkValidator, bodyLinkValidator, updateLink)


export default router;