FROM node:4

ADD . /app

# Install dependencies
RUN cd /app; \  
    npm install --production

# Expose our server port.
EXPOSE 8124

# Run our app.
CMD ["node", "/app/index.js"]