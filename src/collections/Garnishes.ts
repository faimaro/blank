import type { CollectionConfig } from 'payload';

export const Garnishes: CollectionConfig = {
    slug: 'garnishes',
    admin: {
      useAsTitle: 'name', // Campo que se muestra como título en el panel de administración
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
        label: 'Nombre de la Guarnición',
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Descripción (opcional)',
      },
      {
        name: 'price',
        type: 'number',
        label: 'Precio Adicional',
        required: true,
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media', // Relación con una colección de medios (imágenes)
        label: 'Imagen de la Guarnición (opcional)',
      },
    ],
  };

  export default Garnishes;