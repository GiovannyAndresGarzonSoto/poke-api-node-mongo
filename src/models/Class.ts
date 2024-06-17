import { Schema, model, Document } from 'mongoose'

export interface IClass extends Document{
    name: string
    imageUrl: string
    publicId: number
}

const ClassSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la Clase es obligatorio'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, 'La url de la imagen es obligatoria']
    },
    publicId: {
        type: String,
        required: [true, 'El Id publico de la imagen es obligatorio']
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model<IClass>('Class', ClassSchema)