import { Router } from "express";
import {registerUser} from '../controllers/user.controller.js'
import { upload } from "../middlewares/multer.middlewire.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avtar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount:1
        }
    ]),
    registerUser)

export default Router