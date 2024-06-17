import { Schema, model, Document } from 'mongoose'

export interface IGroup extends Document{
    name: string
}

let validGroups = {
    values: ['Campo', 'Planta', 'Bicho', 'Dragon', 'Ditto', 'Agua 1', 'Agua 2', 'Agua 3', 'Monstruo', 'Volador', 'Humanoide', 'Hada', 'Amorfo', 'Mineral', 'Desconocido', '-'],
    message: '{VALUE} no es un Grupo Huevo valido'
}

const GroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El Nombre es obligatorio'],
        enum: validGroups,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model<IGroup>('Group', GroupSchema)