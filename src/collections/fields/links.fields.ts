import { Field } from 'payload'

const linksFields: Field[] = [
  {
    name: 'nombre',
    type: 'text',
    required: true,
  },
  {
    name: 'url',
    type: 'text',
    required: true,
  },
  {
    name: 'descripcion',
    type: 'textarea',
    required: false,
  },
  {
    name: 'icono',
    type: 'upload',
    relationTo: 'media', // Asegúrate de tener una colección llamada 'media' para manejar archivos
    required: false,
  },
  {
    name: 'merchant',
    type: 'relationship',
    relationTo: 'merchants', // Relación con la colección de merchants
    required: true,
  },
]

export default linksFields
