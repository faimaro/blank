import type { CollectionConfig } from 'payload'
import branchesFields from './fields/branches.fields'

export const Branches: CollectionConfig = {
  slug: 'branches',
  admin: {
    useAsTitle: 'alias', // Usamos el alias como título en el admin
  },
  access: {
    read: () => true, // Cualquier usuario puede leer los datos
    create: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden crear
    update: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden actualizar
    delete: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden eliminar
  },
  fields: branchesFields,
}

export default Branches
