import type { CollectionConfig } from 'payload';

export const Plates: CollectionConfig = {
  slug: 'plates',
  admin: {
    useAsTitle: 'name', // Usamos el campo 'name' como título en el admin
  },
  fields: [
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
      required: true, // Campo obligatorio,
      validate: (value: any) => value >= 0 || 'El precio debe ser mayor o igual a 0' 
    },
  ],
};

export default Plates;
