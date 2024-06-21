import { Request, Response } from 'express'
import Group, { IGroup } from '../models/Group'

export const groupsController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const data = await Group.find()
                .sort('name')
                .exec()
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Grupos'
                })
            }
            return res.status(200).json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se han podido listar los Grupos',
                err
            })
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const data: IGroup = await Group.findById(id)
            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: 'El Grupo no existe'
                })
            }
            return res.json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido listar el Grupo',
                err
            })
        }
    },
    add: async (req: Request, res: Response) => {
        try {
            const { name } = req.body
            const newGroup: IGroup = new Group({ name })
            await newGroup.save().catch(err => {
                return res.status(400).json({
                    success: true,
                    message: 'Problemas al agregar la Habilidad',
                    err
                })
            })
            return res.json({
                success: true,
                data: newGroup
            })
        }catch(err){
            return res.status(400).json({
                success: true,
                message: 'No se ha podido agregar la Habilidad',
                err
            })
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const {body} = req 
            const updatedGroup: IGroup = await Group.findByIdAndUpdate(id, body, {new: true})
            if(!updatedGroup){
                return res.status(400).json({
                    success: false,
                    message: 'El Grupo no existe'
                })
            }
            return res.json({
                success: true,
                data: updatedGroup
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido actualizar el Grupo',
                err
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const removedGroup: IGroup = await Group.findByIdAndRemove(id)
            if(!removedGroup){
                return res.status(400).json({
                    success: false,
                    message: 'El Grupo no existe'
                })
            }
            return res.json({
                success: true,
                message: 'Grupo eliminado',
                data: removedGroup
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar el Grupo',
                err
            })
        }
    }
}