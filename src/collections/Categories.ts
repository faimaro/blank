import type { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
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
      required: false, // No obligatorio, puede ser vacío
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false, // Descripción opcional
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Is Active?',
      defaultValue: true, // Por defecto estará activa
    },
    {
      name: 'catOrder',
      type: 'number',
      label: 'Category Order',
      required: false, // Campo opcional
    },
    {
      name: 'hasIndicators',
      type: 'checkbox',
      label: 'Has Indicators?',
      defaultValue: false, // Por defecto no tendrá indicadores
    },
    {
      name: 'visibleInMenu',
      type: 'checkbox',
      label: 'Visible in Menu?',
      defaultValue: true, // Por defecto será visible en el menú
    },
    {
      name: 'branch',
      type: 'relationship',
      label: 'Branch',
      relationTo: 'branches', // Slug de la colección Branches
      required: true, // La relación con una sucursal es obligatoria
    },
  ],
};

export default Categories;
