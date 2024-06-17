import { Request, Response } from 'express'
import Type, { IType } from '../models/Type'

const cloudinary = require('cloudinary').v2;
require('../config/cloudinary')

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
            const result = await cloudinary.uploader.upload(req.files[0].path).catch(err => console.log(err))
            console.log(result)
            const newType: IType = new Type({ name, image: result.secure_url, publicId: result.public_id })

            await newType.save().catch(err => {
                return res.status(400).json({
                    success: true,
                    message: 'Problemas al agregar el Tipo',
                    err
                })
            })
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
    update: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const {body} = req 
            const updatedType: IType = await Type.findByIdAndUpdate(id, body, {new: true})
            if(!updatedType){
                return res.status(400).json({
                    success: false,
                    message: 'El Tipo no existe'
                })
            }
            return res.json({
                success: true,
                data: updatedType
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido actualizar el Tipo',
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