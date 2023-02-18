import { Router } from 'express';
import { redirectLink } from '../controllers/redirect.controller.js';
const route = Router()

route.get('/:nanoLink', redirectLink)

export default route;