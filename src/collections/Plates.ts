import type { CollectionConfig } from 'payload'
import PlatesEndpoint from './endpoints/plates.endpoint'
import platesFields from './fields/plates.fields'

export const Plates: CollectionConfig = {
  slug: 'plates',
  admin: {
    useAsTitle: 'name', // Usamos el campo 'name' como título en el admin
  },
  access: {
    read: () => true, // Cualquier usuario puede leer los datos
    create: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden crear
    update: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden actualizar
    delete: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden eliminar
  },
  fields: platesFields,
  endpoints: PlatesEndpoint,
}

export default Plates
