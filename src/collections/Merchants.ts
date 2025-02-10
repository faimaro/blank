import type { CollectionConfig } from 'payload';

export const Merchants: CollectionConfig = {
  slug: 'merchants',
  admin: {
    useAsTitle: 'name', // El campo que se usará como título en el admin
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre del Comerciante',
      required: true, // Campo obligatorio
    },
    {
      name: 'slug',
      type: 'text',
      label: 'slug para web',
      required: true, // Campo obligatorio
    },
    {
      name: 'email',
      type: 'email',
      label: 'Correo Electrónico',
      required: true,
      unique: true, // Correo único para cada comerciante
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Dirección',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: '¿Está Activo?',
      defaultValue: true, // Por defecto estará activo
    },
  ],
};


