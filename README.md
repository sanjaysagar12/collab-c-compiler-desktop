# Collaborative C Compiler Desktop

A desktop application that allows multiple users to collaborate on writing and running C code in real-time. Built with Electron, Express, and Socket.IO.

![Collaborative C Compiler Screenshot](https://via.placeholder.com/800x450.png?text=Collaborative+C+Compiler+Desktop)

## Features

- **Real-time Collaboration**: Multiple users can edit C code simultaneously
- **Live Code Execution**: Compile and run C code with a single click
- **Desktop Application**: Native desktop experience powered by Electron
- **Clean UI**: Dark-themed interface optimized for coding
- **Instant Feedback**: See compilation errors and program output immediately

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- GCC compiler (for C code compilation)

### Steps

1. Clone this repository:
```bash
git clone https://github.com/sanjaysagar12/collab-c-compiler-desktop.git
cd collab-c-compiler-desktop
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

Or use the development mode:
```bash
npm run dev
```

## How It Works

The application consists of:

1. **Electron Frontend**: Creates a desktop window that loads the web application
2. **Express Server**: Handles HTTP requests and serves the static web content
3. **Socket.IO**: Enables real-time collaboration by syncing code changes between users
4. **C Compiler Integration**: Uses the local GCC compiler to compile and run code

## Project Structure

- `main.js` - Electron main process file
- `app.js` - Express server and Socket.IO setup
- `public/index.html` - Frontend user interface
- `package.json` - Project configuration and dependencies

## Usage

1. Launch the application using `npm start`
2. The editor will open with a default "Hello, World!" C program
3. Edit the code - changes are automatically shared with other connected users
4. Click "Run Code" to compile and execute the C program
5. View the output or error messages in the output panel below

## Collaboration Features

- Every connected user sees the same code
- Changes from one user are instantly propagated to others
- Visual indication when another user is typing
- All users can run the code and see the output

## Technical Details

- **Backend**: Node.js with Express
- **Frontend**: HTML, CSS, and vanilla JavaScript
- **Real-time Communication**: Socket.IO
- **Desktop Integration**: Electron
- **Code Execution**: Local GCC compiler

## Requirements

- Windows, macOS, or Linux operating system
- GCC compiler installed and accessible in the system PATH
- Minimum 4GB RAM recommended
- At least 100MB of free disk space

## Future Improvements

- Syntax highlighting for the code editor
- User authentication and session management
- Support for additional programming languages
- Code versioning and history
- Custom themes and appearance settings

## License

[MIT License](LICENSE)

## Author

Sanjay Sagar - [GitHub Profile](https://github.com/sanjaysagar12)

---

Created on: 2025-06-25