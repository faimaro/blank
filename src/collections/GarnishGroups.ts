import type { CollectionConfig } from 'payload';

export const GarnishGroups: CollectionConfig = {

    slug: 'garnish-groups',
    admin: {
      useAsTitle: 'name',
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
        label: 'Nombre del Grupo de Guarniciones',
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Descripción (opcional)',
      },
      {
        name: 'mandatory',
        type: 'checkbox',
        label: 'Es Obligatorio Elegir una Guarnición',
      },
      {
        name: 'maxQuantity',
        type: 'number',
        label: 'Máximo de Selecciones Permitidas',
      },
      {
        name: 'minQuantity',
        type: 'number',
        label: 'Mínimo de Selecciones Requeridas',
      },
      {
        name: 'multipleSelection',
        type: 'checkbox',
        label: 'Permitir Múltiples Selecciones',
      },
      {
        name: 'garnishes',
        type: 'relationship',
        relationTo: 'garnishes', // Relación con la colección `garnishes`
        hasMany: true, // Un grupo puede tener muchas guarniciones
        label: 'Guarniciones Disponibles',
      },
    ],
  };

    export default GarnishGroups;