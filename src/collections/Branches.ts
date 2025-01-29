import type { CollectionConfig } from 'payload';

export const Branches: CollectionConfig = {
  slug: 'branches',
  admin: {
    useAsTitle: 'alias', // Usamos el alias como título en el admin
  },
  fields: [
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
      name: 'name',
      type: 'relationship',
      label: 'Merchant',
      relationTo: ['merchants' as const], // Slug de la colección de comerciantes
      required: true, // Relación obligatoria
    },
  ],
};

export default Branches;
