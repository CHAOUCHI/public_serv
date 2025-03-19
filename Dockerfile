FROM node

COPY . .

EXPOSE 4000

ENTRYPOINT [ "node","app.mjs" ]