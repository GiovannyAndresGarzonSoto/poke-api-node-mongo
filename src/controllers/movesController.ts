import { Request, Response } from 'express'
import Move, { IMove } from '../models/Move'

export const movesController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const data = await Move.find()
                .sort('name')
                .exec()
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Movimientos'
                })
            }
            return res.status(200).json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se han podido listar los Movimientos',
                err
            })
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const data: IMove = await Move.findById(id)
            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: 'El Movimiento no existe'
                })
            }
            return res.json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido listar el Movimiento',
                err
            })
        }
    },
    add: async (req: Request, res: Response) => {
        try {
            const { name, description, power, 
                accuracy, type, clase } = req.body
            const newMove: IMove = new Move({ name, description, power, accuracy, type, class: clase})
            await newMove.save().catch(err => {
                return res.status(400).json({
                    success: true,
                    message: 'Problemas al agregar el Movimiento',
                    err
                })
            })
            return res.json({
                success: true,
                data: newMove
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
            const updatedMove: IMove = await Move.findByIdAndUpdate(id, body, {new: true})
            if(!updatedMove){
                return res.status(400).json({
                    success: false,
                    message: 'El Movimiento no existe'
                })
            }
            return res.json({
                success: true,
                data: updatedMove
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido actualizar el Movimiento',
                err
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const removedMove: IMove = await Move.findByIdAndRemove(id)
            if(!removedMove){
                return res.status(400).json({
                    success: false,
                    message: 'El Movimiento no existe'
                })
            }
            return res.json({
                success: true,
                message: 'Movimiento eliminado',
                data: removedMove
            })
        }catch(err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar el Movimiento',
                err
            })
        }
    }
}