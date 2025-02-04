import type { CollectionConfig } from 'payload';

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
  fields: [
    // Número de Orden (Generado automáticamente)
    {
      name: 'orderNumber',
      type: 'text',
      label: 'Número de Orden',
      unique: true,
      admin: {
        readOnly: true, // Este campo es de solo lectura y se genera automáticamente
      },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === 'create') {
              return `ORD-${Date.now()}`; // Genera un número de orden único (puedes ajustar el formato)
            }
            return value;
          },
        ],
      },
    },

    // Cliente
    {
      name: 'customer',
      type: 'group',
      label: 'Información del Cliente',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nombre del Cliente',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          label: 'Correo Electrónico',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Teléfono',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          label: 'Dirección de Entrega',
          required: true,
        },
      ],
    },

    // Detalles del Pedido
    {
      name: 'items',
      type: 'array',
      label: 'Productos del Pedido',
      minRows: 1, // Al menos un producto debe estar en el pedido
      fields: [
        {
          name: 'plate',
          type: 'relationship',
          relationTo: 'plates', // Relación con la colección `plates`
          label: 'Plato',
          required: true,
        },
        {
          name: 'size',
          type: 'relationship',
          relationTo: 'sizes', // Relación con la colección `sizes`
          label: 'Tamaño',
        },
        {
          name: 'garnishes',
          type: 'relationship',
          relationTo: 'garnishes', // Relación con la colección `garnishes`
          hasMany: true, // Un producto puede tener varias guarniciones
          label: 'Guarniciones',
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Cantidad',
          required: true,
          defaultValue: 1,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          label: 'Precio Unitario',
          required: true,
        },
        {
          name: 'totalPrice',
          type: 'number',
          label: 'Precio Total',
          admin: {
            readOnly: true, // Este campo se calcula automáticamente
          },
          hooks: {
            beforeChange: [
              ({ siblingData }) => {
                const quantity = siblingData.quantity || 1;
                const price = siblingData.price || 0;
                return quantity * price; // Calcula el precio total
              },
            ],
          },          
        },
        {
            name: 'observations',
            type: 'textarea',
            label: 'Observaciones',
            required: false, // Opcional
          }
      ],
    },

    // Estado del Pedido
    {
      name: 'status',
      type: 'select',
      label: 'Estado del Pedido',
      options: [
        {
          label: 'Pendiente',
          value: 'pending',
        },
        {
          label: 'Confirmado',
          value: 'confirmed',
        },
        {
          label: 'En Preparación',
          value: 'preparing',
        },
        {
          label: 'Listo para Entregar',
          value: 'ready',
        },
        {
          label: 'Entregado',
          value: 'delivered',
        },
        {
          label: 'Cancelado',
          value: 'cancelled',
        },
      ],
      defaultValue: 'pending',
    },

    // Método de Pago
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Método de Pago',
      options: [
        {
          label: 'Efectivo',
          value: 'cash',
        },
        {
          label: 'Transferencia Bancaria',
          value: 'bank-transfer',
        },
        {
          label: 'Tarjeta Crédito',
          value: 'credit-card',
        },
      ],
      required: true,
    },

    // Fecha del Pedido
    {
      name: 'orderDate',
      type: 'date',
      label: 'Fecha del Pedido',
      admin: {
        readOnly: true, // Este campo se genera automáticamente
      },
      hooks: {
        beforeChange: [
          () => new Date().toISOString(), // Guarda la fecha actual
        ],
      },
    },

    // Notas Adicionales
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notas Adicionales',
    },

    // Total del Pedido
    {
        name: 'totalAmount',
        type: 'number',
        label: 'Total del Pedido',
        admin: {
          readOnly: true, // Este campo se calcula automáticamente
        },
        hooks: {
          beforeChange: [
            ({ data }) => {
              // Verifica que `items` exista y sea un array
              const items = Array.isArray(data?.items) ? data.items : [];
      
              // Calcula el total sumando los `totalPrice` de cada producto
              return items.reduce((total, item) => {
                const itemTotal = typeof item.totalPrice === 'number' ? item.totalPrice : 0;
                return total + itemTotal;
              }, 0);
            },
          ],
        },
      },
  ],
};

export default Orders;