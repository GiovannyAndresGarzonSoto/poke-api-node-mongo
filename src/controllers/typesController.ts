import { Request, Response } from 'express'
import Type, { IType } from '../models/Type'
import { promisify } from 'util'
import fs from 'fs'
import cloudinary from '../config/cloudinary'

const unlinkAsync = promisify(fs.unlink);

export const typesController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const data = await Type.find()
                .sort('name')
                .exec()
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar del Tipo'
                })
            }
            return res.status(200).json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se han podido listar el Tipo',
                err
            })
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const data: IType = await Type.findById(id)
            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: 'El Tipo no existe'
                })
            }
            return res.json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido listar el Tipo',
                err
            })
        }
    },
    add: async (req: Request, res: Response) => {
        try {
            const { name } = req.body
            const { secure_url , public_id } = await cloudinary.uploader.upload(req.file.path)
            const newType: IType = new Type({ name, imageUrl: secure_url, publicId: public_id })

            await newType.save().catch(err => {
                return res.status(400).json({
                    success: true,
                    message: 'Problemas al agregar el Tipo',
                    err
                })
            })

            await unlinkAsync(req.file.path)

            return res.json({
                success: true,
                data: newType
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar El Tipo',
                err
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const removedType: IType = await Type.findByIdAndRemove(id)
            if(!removedType){
                return res.status(400).json({
                    success: false,
                    message: 'El Tipo no existe'
                })
            }
            cloudinary.uploader.destroy(removedType.publicId)
            return res.json({
                success: true,
                message: 'Tipo eliminado',
                data: removedType
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar el Tipo',
                err
            })
        }
    }
}