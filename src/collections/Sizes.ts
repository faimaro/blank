import type { CollectionConfig } from 'payload';

export const Sizes: CollectionConfig = {
    slug: 'sizes',
    admin: {
      useAsTitle: 'name',
    },
    fields: [
      {
        name: 'isVisibleInMenu',
        type: 'checkbox',
        label: 'Visible en el Menú',
      },
      {
        name: 'name',
        type: 'text',
        required: true,
        label: 'Nombre del Tamaño',
      },
      {
        name: 'price',
        type: 'number',
        label: 'Precio Adicional',
        required: true,
      },
    ],
  };

  export default Sizes;