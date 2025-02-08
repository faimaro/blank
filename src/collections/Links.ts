import type { CollectionConfig } from 'payload'
// Colección de Links
export const Links: CollectionConfig = {
  slug: 'links', // Nombre de la colección
  admin: {
    useAsTitle: 'nombre', // Campo que se mostrará como título en el panel de administración
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'textarea',
      required: false,
    },
    {
      name: 'icono',
      type: 'upload',
      relationTo: 'media', // Asegúrate de tener una colección llamada 'media' para manejar archivos
      required: false,
    },
    {
      name: 'merchant',
      type: 'relationship',
      relationTo: 'merchants', // Relación con la colección de merchants
      required: true,
    },
  ],
};



export default [Links];