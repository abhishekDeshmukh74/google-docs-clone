require("dotenv").config();
const mongoose = require("mongoose");
const { Document, findOrCreateDocument } = require("./Document");

const http = require("http");
const { Server } = require("socket.io");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || '*',
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {

    socket.on("get-document", async (documentId) => {
        const document = await findOrCreateDocument(documentId);
        socket.join(documentId);
        socket.emit("load-document", document.data);

        socket.on("send-changes", (delta) => {
            socket.broadcast.to(documentId).emit("receive-changes", delta);
        });

        socket.on("save-document", async (data) => {
            await Document.findByIdAndUpdate(documentId, { data });
        });
    });
});
