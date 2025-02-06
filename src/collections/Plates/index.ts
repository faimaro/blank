import type { CollectionConfig } from 'payload'
import { PlatesService } from '@/services/plates.service'
import platesFields from './plates.fields'

export const Plates: CollectionConfig = {
  slug: 'plates',
  admin: {
    useAsTitle: 'name', // Usamos el campo 'name' como título en el admin
    defaultColumns: ['name', 'category', 'price', 'isActive'],
    group: 'Branches',
  },
  access: {
    read: () => true, // Cualquier usuario puede leer los datos
    create: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden crear
    update: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden actualizar
    delete: ({ req: { user } }) => Boolean(user), // Solo usuarios autenticados pueden eliminar
  },
  fields: platesFields,
  endpoint: [
    {
      path: 'plates/:id',
      method: 'get',
      handler: async (req, res, next) => {
        try {
          const { id } = req.params
          if (!id || typeof id !== 'string' || id.trim() === '') {
            return res.status(400).json({ error: 'Invalid ID' })
          }

          const plate = await PlatesService.findById(id)

          if (!plate) {
            return res.status(404).json({ error: 'Plate not found' })
          }

          return res.json(plate)
        } catch (error: any) {
          console.error(`Error fetching plate with ID ${params.id}:`, error?.message)
          return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
        }
      },
    },
  ],
}

export default Plates
