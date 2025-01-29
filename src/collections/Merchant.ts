import type { CollectionConfig } from 'payload';

export const Merchant: CollectionConfig = {
  slug: 'merchant',
  admin: {
    useAsTitle: 'merchant', // El campo que se usará como título en el admin
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre del Comerciante',
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

export default Merchant;
