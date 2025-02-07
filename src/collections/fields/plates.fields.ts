import { Field } from 'payload'

const platesFields: Field[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    required: true, // Campo obligatorio
  },
  {
    name: 'showName',
    type: 'text',
    label: 'Show Name',
    required: false, // Opcional
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    required: false, // Opcional
  },
  {
    name: 'isActive',
    type: 'checkbox',
    label: 'Is Active?',
    defaultValue: false, // Por defecto está inactivo
  },
  {
    name: 'isVisibleInMenu',
    type: 'checkbox',
    label: 'Is Visible in Menu?',
    defaultValue: true, // Por defecto será visible en el menú
  },
  {
    name: 'platOrder',
    type: 'number',
    label: 'Plate Order',
    required: false, // Campo opcional
  },
  {
    name: 'withImage',
    type: 'checkbox',
    label: 'With Image?',
    defaultValue: true, // Por defecto tiene imagen
  },
  {
    name: 'hasIndicators',
    type: 'checkbox',
    label: 'Has Indicators?',
    defaultValue: false, // Por defecto no tiene indicadores
  },
  {
    name: 'category',
    type: 'relationship',
    label: 'Category',
    relationTo: 'categories', // Slug de la colección Categories
    required: true, // Relación obligatoria
  },
  {
    name: 'imageURL',
    type: 'text',
    label: 'Image URL',
    required: false, // Campo opcional
  },
  {
    name: 'fileName',
    type: 'text',
    label: 'File Name',
    required: false, // Campo opcional
  },
  {
    name: 'price',
    type: 'number',
    label: 'Price',
    required: true, // Campo obligatorio
    validate: (value: any) => value >= 0 || 'El precio debe ser mayor o igual a 0',
  },
  // Nueva relación: Sizes
  {
    name: 'sizes',
    type: 'relationship',
    relationTo: 'sizes', // Relación con la colección `sizes`
    hasMany: true, // Un plato puede tener muchos tamaños
    label: 'Tamaños Disponibles',
    required: false, // Opcional
  },
  // Nueva relación: Garnish Groups
  {
    name: 'garnishGroups',
    type: 'relationship',
    relationTo: 'garnish-groups', // Relación con la colección `garnish-groups`
    hasMany: true, // Un plato puede tener muchos grupos de guarniciones
    label: 'Grupos de Guarniciones',
    required: false, // Opcional
  },
]

export default platesFields //log
