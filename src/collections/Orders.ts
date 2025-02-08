import type { CollectionConfig } from 'payload'
import orderFields from './fields/order.fields'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber', // Usamos el número de orden como título en el panel de administración
  },
  access: {
    read: () => true, // Cualquier usuario puede leer los datos (ajusta según tus necesidades)
    create: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden crear pedidos
    update: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden actualizar pedidos
    delete: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden eliminar pedidos
  },
  fields: orderFields,
}

export default Orders
