import { Document, model, Schema } from 'mongoose'

export interface IMove extends Document{
    name: string
    description: string
    power?: number
    accuracy?: number
    type: Schema.Types.ObjectId
    class: Schema.Types.ObjectId
}
const moveSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La descripción  es oblitoria'],
        trim: true
    },
    power: {
        type: Number,
        required: false
    },
    accuracy: {
        type: Number,
        require: false
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type',
        required: [true, 'El Tipo es obligatorio']
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: [true, 'La Clase es obligatoria']
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model<IMove>('Move', moveSchema)