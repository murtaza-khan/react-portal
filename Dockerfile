#NODE BUILDER (STAGE-0) RUN TO BUILD THE PROD READY CODE
FROM node:14.18.3 as builder
ARG PUBLIC_URL=/couponportal
ENV PUBLIC_URL=${PUBLIC_URL}
RUN mkdir -p /opt/web/portal
WORKDIR /opt/web/portal/

# Copy package.json and run install to use docker caching
# when possible to avoid re-run of yarn install step if nothing in
# package.json changed
RUN echo ${PUBLIC_URL}
COPY ./package.json .
RUN yarn install

# Copy the rest of the project and build it
COPY . .
RUN yarn build
WORKDIR /opt/web/portal/build
RUN touch _redirects
RUN echo "/*  /index.html  200" > _redirects

#NGINX STAGE-1 TO HOST THE CODE OVER NGINX
FROM nginx:1.20.2-alpine
ARG PUBLIC_URL=/couponportal
ENV PUBLIC_URL=${PUBLIC_URL}
WORKDIR /etc/nginx
COPY --from=builder /opt/web/portal/nginx.conf.template .
RUN envsubst '${PUBLIC_URL}' < nginx.conf.template > nginx.conf

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
RUN mkdir -p couponportal
COPY --from=builder /opt/web/portal/build ./couponportal
