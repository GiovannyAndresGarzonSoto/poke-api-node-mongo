import { Request, Response } from 'express'
import Class, { IClass } from '../models/Class'
import { promisify } from 'util'
import fs from 'fs'
import cloudinary from '../config/cloudinary'

const unlinkAsync = promisify(fs.unlink);

export const classesController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const data = await Class.find()
                .sort('name')
                .exec()
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar la Clase'
                })
            }
            return res.status(200).json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se han podido listar la Clase',
                err
            })
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const data: IClass = await Class.findById(id)
            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: 'La Clase no existe'
                })
            }
            return res.json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido listar la Clase',
                err
            })
        }
    },
    add: async (req: Request, res: Response) => {
        try {
            const { name } = req.body
            const { secure_url , public_id } = await cloudinary.uploader.upload(req.file.path)
            const newClass: IClass = new Class({ name, imageUrl: secure_url, publicId: public_id })

            await newClass.save().catch(err => {
                return res.status(400).json({
                    success: true,
                    message: 'Problemas al agregar la Clase',
                    err
                })
            })

            await unlinkAsync(req.file.path)

            return res.json({
                success: true,
                data: newClass
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar la Clase',
                err
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const removedClass: IClass = await Class.findByIdAndRemove(id)
            if(!removedClass){
                return res.status(400).json({
                    success: false,
                    message: 'La Clase no existe'
                })
            }
            // cloudinary.uploader.destroy(removedClass.publicId)
            return res.json({
                success: true,
                message: 'Clase eliminada',
                data: removedClass
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar la Clase',
                err
            })
        }
    }
}