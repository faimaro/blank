import { Field } from 'payload'

const branchesFields: Field[] = [
  {
    name: 'alias',
    type: 'text',
    label: 'Alias',
    required: true, // Campo obligatorio
  },
  {
    name: 'address',
    type: 'textarea',
    label: 'Dirección',
    required: true, // Campo obligatorio
  },
  {
    name: 'isActive',
    type: 'checkbox',
    label: '¿Está Activa?',
    defaultValue: true, // Por defecto está activa
  },
  {
    name: 'comercio',
    type: 'relationship',
    relationTo: 'merchants', // Relación con la colección merchants
    label: 'Comercio',
    required: true,
  },
  {
    name: 'plates',
    type: 'relationship',
    relationTo: 'plates',
    hasMany: true,
    label: 'Platos disponibles',
  },
]

export default branchesFields
