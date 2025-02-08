import { Field } from 'payload'

const orderFields: Field[] = [
  {
    name: 'orderNumber',
    type: 'text',
    label: 'Número de Orden',
    unique: true,
    admin: { readOnly: true },
    hooks: {
      beforeChange: [
        ({ value, operation }) => {
          if (operation === 'create' && !value) {
            return `ORD-${Date.now()}`
          }
          return value
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
      { name: 'name', type: 'text', label: 'Nombre', required: true },
      { name: 'email', type: 'email', label: 'Correo Electrónico', required: true },
      { name: 'phone', type: 'text', label: 'Teléfono', required: true },
      { name: 'address', type: 'text', label: 'Dirección de Entrega', required: true },
    ],
  },

  // Detalles del Pedido
  {
    name: 'items',
    type: 'array',
    label: 'Productos del Pedido',
    minRows: 1,
    fields: [
      {
        name: 'plate',
        type: 'relationship',
        relationTo: 'plates',
        label: 'Plato',
        required: true,
      },
      {
        name: 'size',
        type: 'relationship',
        relationTo: 'sizes',
        label: 'Tamaño',
      },
      {
        name: 'garnishes',
        type: 'relationship',
        relationTo: 'garnishes',
        hasMany: true,
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
        admin: { readOnly: true },
        hooks: {
          beforeChange: [
            ({ siblingData }) => {
              const quantity = Number(siblingData.quantity) || 1
              const price = Number(siblingData.price) || 0
              return quantity * price
            },
          ],
        },
      },
      { name: 'observations', type: 'textarea', label: 'Observaciones' },
    ],
  },

  // Estado del Pedido
  {
    name: 'status',
    type: 'select',
    label: 'Estado',
    options: [
      { label: 'Pendiente', value: 'pending' },
      { label: 'Confirmado', value: 'confirmed' },
      { label: 'En Preparación', value: 'preparing' },
      { label: 'Listo para Entregar', value: 'ready' },
      { label: 'Entregado', value: 'delivered' },
      { label: 'Cancelado', value: 'cancelled' },
    ],
    defaultValue: 'pending',
  },

  // Método de Pago
  {
    name: 'paymentMethod',
    type: 'select',
    label: 'Método de Pago',
    options: [
      { label: 'Efectivo', value: 'cash' },
      { label: 'Transferencia Bancaria', value: 'bank-transfer' },
      { label: 'Tarjeta Crédito', value: 'credit-card' },
    ],
    required: true,
  },

  // Fecha del Pedido
  {
    name: 'orderDate',
    type: 'date',
    label: 'Fecha',
    admin: { readOnly: true },
    hooks: { beforeChange: [() => new Date().toISOString()] },
  },

  // Notas Adicionales
  { name: 'notes', type: 'textarea', label: 'Notas Adicionales' },

  // Total del Pedido
  {
    name: 'totalAmount',
    type: 'number',
    label: 'Total',
    admin: { readOnly: true },
    hooks: {
      beforeChange: [
        ({ data }) => {
          const items = Array.isArray(data?.items) ? data.items : []
          return items.reduce((total, item) => total + (Number(item.totalPrice) || 0), 0)
        },
      ],
    },
  },
]

export default orderFields
