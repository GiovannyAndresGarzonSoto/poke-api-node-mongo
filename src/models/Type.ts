import { Schema, model, Document } from 'mongoose'

export interface IType extends Document {
    name: string
    imageUrl: string
    publicId: string
}

const TypeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El Nombre del Tipo es obligatorio'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, 'La url de la imagen es obligatoria']
    },
    publicId: {
        type: String,
        required: [true, 'El ID publico del Tipo es obligatorio']
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model<IType>('Type', TypeSchema)