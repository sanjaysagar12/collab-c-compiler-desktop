const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

let sharedCode = `#include <stdio.h>\nint main() {\n    printf("Hello, world!\\n");\n    return 0;\n}`;

app.use(express.static("public"));
app.use(express.text());

app.post("/run", (req, res) => {
    fs.writeFile("code.c", req.body, (err) => {
        if (err) return res.status(500).send("File write failed");

        exec("gcc code.c -o code.out", (compileErr, _, compileStderr) => {
            if (compileErr) return res.send("❌ Compilation Error:\n\n" + compileStderr);

            exec("./code.out", (runErr, runStdout, runStderr) => {
                if (runErr) return res.send("⚠️ Runtime Error:\n\n" + runStderr);
                res.send("✅ Output:\n\n" + runStdout);
            });
        });
    });
});

io.on("connection", (socket) => {
    console.log("🔌 A user connected");

    // Send the current code to the newly connected client
    socket.emit("codeUpdate", sharedCode);

    // Listen for code changes and broadcast to others
    socket.on("codeChange", (newCode) => {
        sharedCode = newCode;
        socket.broadcast.emit("codeUpdate", newCode);
    });

    socket.on("disconnect", () => {
        console.log("❌ A user disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
