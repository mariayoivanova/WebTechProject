# Verwenden Sie das offizielle Node.js-Image als Basisimage
FROM node:18

# Legen Sie das Arbeitsverzeichnis im Container fest
WORKDIR /usr/src/app

# Kopieren Sie package.json und package-lock.json in das Arbeitsverzeichnis
COPY package*.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

# Kopieren Sie den Rest des Anwendungsquellcodes in das Arbeitsverzeichnis
COPY . .

# Exponieren Sie den Port, auf dem die Anwendung ausgeführt wird
EXPOSE 5001

# Definieren Sie den Befehl zum Starten der Anwendung
CMD ["node", "app.js"]
