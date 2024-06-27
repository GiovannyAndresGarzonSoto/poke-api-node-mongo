import { model, Document, Schema} from 'mongoose'

export interface IPokemon extends Document {
    number: number
    name: string
    description: string
    weight: number
    height: number
    hp: number
    attack: number
    defense: number
    spAttack: number
    spDefense: number
    speed: number
    imageUrl: String
    publicId: String
    gen: String
    type1: Schema.Types.ObjectId
    type2?: Schema.Types.ObjectId
    group1: Schema.Types.ObjectId
    group2?: Schema.Types.ObjectId | null
    ability1: Schema.Types.ObjectId 
    ability2?: Schema.Types.ObjectId | null 
    ability3?: Schema.Types.ObjectId | null
}

const pokemonSchema = new Schema({
    number: {
        type: Number,
        required: [true, 'El Numero es obligatorio']
    }, 
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    hp: {
        type: Number,
        required: [true, 'Los Puntos de Vida son requeridos'] 
    },
    attack: {
        type: Number,
        required: [true, 'El Ataque es requerido']
    },
    defense: {
        type: Number,
        required: [true, 'La Defensa es requerida']
    }, 
    spAttack: {
        type: Number,
        required: [true, 'La Ataque Especial es requerido']
    },
    spDefense: {
        type: Number,
        required: [true, 'La Defensa Especial es requerida']
    }, 
    speed: {
        type: Number,
        required: [true, 'La Velocidad es requerida']
    },
    imageUrl: {
        type: String,
        required: [true, 'La url de la Imagen es obligatoria']
    },
    publicId: {
        type: String,
        required: [true, 'El Id publico es obligatorio']
    },
    gen: {
        type: String,
        required: [true, 'La Generación es obligatoria']
    },
    type1: {
        type: Schema.Types.ObjectId,
        ref: 'Types',
        required: [true, 'El Tipo es obligatorio']
    },
    type2: {
        type: Schema.Types.ObjectId,
        ref: 'Types',
        required: false
    },
    group1: {
        type: Schema.Types.ObjectId,
        ref: 'Groups',
        required: [true, 'El Grupo Huevo es obligatorio']
    },
    group2: {
        type: Schema.Types.ObjectId,
        ref: 'Groups',
        required: false,
        default: null
    },
    ability1: {
        type: Schema.Types.ObjectId,
        ref: 'Abilities',
        required: [true, 'La Habilidad es obligatoria']
    },
    ability2: {
        type: Schema.Types.ObjectId,
        ref: 'Abilities',
        required: false,
        default: null
    },
    ability3: {
        type: Schema.Types.ObjectId,
        ref: 'Abilities',
        required: false,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: 'pokemon'
})

export default model<IPokemon>('Pokemon', pokemonSchema)