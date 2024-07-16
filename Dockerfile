# Use a imagem oficial do Node.js 18 com a versão LTS
FROM node:18-alpine AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm ci --frozen-lockfile

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação
RUN npm run build

# Estágio 2: Sirva a aplicação usando um servidor Nginx
FROM nginx:alpine

# Copie a aplicação construída do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta que a aplicação utiliza
EXPOSE 80

# Inicie o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
