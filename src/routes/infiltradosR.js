import{Router} from 'express'
import multer from 'multer';

import { deleteInfiltrados, getInfiltrados, patchInfiltrados, postInfiltrados, putInfiltrados } from '../controladores/infiltradosCtrl.js';

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads'); //carpeta donde se guardan las imagenes
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
    });

const uploads=multer({storage});

const router=Router();
//rutas
router.get('/infiltrados', getInfiltrados)
router.post('/infiltrados', postInfiltrados)
router.put('/infiltrados', putInfiltrados)
router.patch('/infiltrados', patchInfiltrados)
router.delete('/infiltrados', deleteInfiltrados)
