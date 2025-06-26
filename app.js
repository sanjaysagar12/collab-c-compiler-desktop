const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// A simple mutex class
class Mutex {
    constructor() {
        this.queue = [];
        this.locked = false;
    }

    lock() {
        return new Promise(resolve => {
            if (this.locked) {
                this.queue.push(resolve);
            } else {
                this.locked = true;
                resolve();
            }
        });
    }

    unlock() {
        if (this.queue.length > 0) {
            const next = this.queue.shift();
            next();
        } else {
            this.locked = false;
        }
    }
}

const mutex = new Mutex();

// Initial shared code
let sharedCode = `#include <stdio.h>\nint main() {\n    printf("Hello, world!\\n");\n    return 0;\n}`;

app.use(express.static("public"));
app.use(express.text());

// Route to run C code
app.post("/run", async (req, res) => {
    await mutex.lock(); // Acquire lock

    fs.writeFile("code.c", req.body, (err) => {
        if (err) {
            mutex.unlock();
            return res.status(500).send("❌ File write failed");
        }

        exec("gcc code.c -o code.out", (compileErr, _, compileStderr) => {
            if (compileErr) {
                mutex.unlock();
                return res.send("❌ Compilation Error:\n\n" + compileStderr);
            }

            exec("./code.out", (runErr, runStdout, runStderr) => {
                mutex.unlock();

                if (runErr) return res.send("⚠️ Runtime Error:\n\n" + runStderr);
                res.send("✅ Output:\n\n" + runStdout);
            });
        });
    });
});

// WebSocket collaboration
io.on("connection", (socket) => {
    console.log("🔌 A user connected");

    // Send current shared code to new user
    socket.emit("codeUpdate", sharedCode);

    // Broadcast code changes
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
