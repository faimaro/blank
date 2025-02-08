import type { CollectionConfig } from 'payload'
import linksFields from './fields/links.fields'
import LinkEndpoint from './endpoints/links.endpoint'
// Colección de Links
export const Links: CollectionConfig = {
  slug: 'links', // Nombre de la colección
  admin: {
    useAsTitle: 'nombre', // Campo que se mostrará como título en el panel de administración
  },
  access: {
    read: () => true, // Cualquier usuario puede leer los datos (ajusta según tus necesidades)
    create: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden crear pedidos
    update: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden actualizar pedidos
    delete: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden eliminar pedidos
  },
  fields: linksFields, // Campos de la colección
  endpoints: LinkEndpoint, // Endpoints de la colección
}

export default [Links]
