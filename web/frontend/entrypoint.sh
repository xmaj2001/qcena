#!/bin/sh
set -e

echo "⏳ Iniciando o client..."

if [ "$NODE_ENV" = "development" ]; then
    echo "--- AMBIENTE DE DESENVOLVIMENTO ---"
    echo "🚀 Iniciando o Next.js em modo desenvolvimento..."
    npm run dev
else
    echo "--- AMBIENTE DE PRODUÇÃO ---"
    echo "⏳ Buildando o projecto..."
    npm run build
    echo "🚀 Iniciando o Next.js em modo produção..."
    npm run start
fi

echo "🚀 Client iniciado com sucesso!"
