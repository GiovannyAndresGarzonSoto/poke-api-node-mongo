import { Request, Response } from 'express'
import Pokemon, { IPokemon } from '../models/Pokemon'
import { promisify } from 'util'
import fs from 'fs'
import cloudinary from '../config/cloudinary'

const unlinkAsync = promisify(fs.unlink);

export const pkmnController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const data = await Pokemon.find()
                .sort('name')
                .exec()
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Pokemon'
                })
            }
            return res.status(200).json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se han podido listar los Pokemon',
                err
            })
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const data: IPokemon = await Pokemon.findById(id)
            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: 'El Pokemon no existe'
                })
            }
            return res.json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido listar el Pokemon',
                err
            })
        }
    },
    add: async (req: Request, res: Response) => {
        try {
            const { number, name, description, weight, height, hp, attack, defense, spAttack, spDefense, speed, gen, type1, type2, group1, group2, ability1, ability2, ability3 } = req.body
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path)
            const newPokemon: IPokemon = new Pokemon({ number, name, description, weight, height, hp, attack, defense, spAttack, spDefense, speed, gen, type1, type2, group1, group2, ability1, ability2, ability3, imageUrl: secure_url, publicId: public_id })

            await newPokemon.save().catch(err => {
                return res.status(400).json({
                    success: true,
                    message: 'Problemas al agregar el Pokemon',
                    err
                })
            })

            await unlinkAsync(req.file.path)

            return res.json({
                success: true,
                data: newPokemon
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar el Pokemon',
                err
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const removedPokemon: IPokemon = await Pokemon.findByIdAndRemove(id)
            if (!removedPokemon) {
                return res.status(400).json({
                    success: false,
                    message: 'El Tipo no existe'
                })
            }
            // cloudinary.uploader.destroy(removedPokemon.publicId)
            return res.json({
                success: true,
                message: 'Tipo eliminado',
                data: removedPokemon
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar el Tipo',
                err
            })
        }
    }
}