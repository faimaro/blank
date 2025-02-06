# Etapa base: Usamos Node.js como imagen base
FROM node:20-alpine AS base

# Configuramos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalamos dependencias adicionales si son necesarias (por ejemplo, para MongoDB)
RUN apk add --no-cache libc6-compat

# Etapa de instalación de dependencias
FROM base AS deps
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Etapa de construcción
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Etapa de producción
FROM base AS runner
WORKDIR /app

# Copiamos solo los archivos necesarios para la ejecución
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Exponemos el puerto 3000 (o el puerto que uses en tu aplicación)
EXPOSE 3000

# Definimos las variables de entorno necesarias
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=/app/payload.config.ts
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar la aplicación
CMD ["node", "dist/index.js"]