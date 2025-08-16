# Google Docs Clone

A lightweight collaborative rich-text editor built with **React (Vite)**, **Quill**, **Socket.IO**, **Node/Express**, and **MongoDB**. It supports real-time editing with autosave and document persistence.

> Repo layout includes `client/` and `server/` packages, and the repo is tagged with topics like mongodb, reactjs, socket-io, quill, and vite.

---

## 📸 Screenshots & Live Demo

<p align="center">
    <img src="https://raw.githubusercontent.com/abhishekDeshmukh74/google-docs-clone/main/screenshots/editor.png" alt="Editor Screenshot" width="600"/>
</p>

- **Live Demo:** [https://your-demo-url.com](https://your-demo-url.com)
---

## ✨ Features

- **Real-time collaboration** via Socket.IO rooms (document-scoped).
- **Rich text editing** with Quill (headings, lists, bold/italic/underline, code block, images, colors).
- **Autosave** every few seconds to persist content in MongoDB.
- **Share by URL**: open the same doc ID in multiple tabs to collaborate.
- **Resilient reconnect**: sessions rejoin their room after transient disconnects.

---

## 🧱 Tech Stack

- **Frontend:** React (Vite), Quill, Socket.IO Client
- **Backend:** Node.js, Express, Socket.IO
- **Database:** MongoDB (Mongoose)
- **Build/Dev:** Yarn

---

## 📁 Project Structure

```
google-docs-clone/
├─ client/           # Vite React app (Quill editor, sockets, UI)
└─ server/           # Express + Socket.IO + MongoDB persistence
```

---

## 🚀 Getting Started

### 1) Prerequisites
- Node.js 18+
- Yarn
- MongoDB connection string (Atlas or local)

### 2) Clone
```bash
git clone https://github.com/abhishekDeshmukh74/google-docs-clone.git
cd google-docs-clone
```

### 3) Install deps
```bash
# In root (optional), then per package:
cd client && yarn && cd ..
cd server && yarn && cd ..
```

### 4) Environment variables

Create **`server/.env`**:
```env
PORT=3001
MONGO_URI=your-mongodb-connection-string
# Optional: CORS/frontend URL if you lock it down
CLIENT_ORIGIN=http://localhost:5173
```

Create **`client/.env`**:
```env
# Vite requires the VITE_ prefix
VITE_SERVER_URL=http://localhost:3001
```

> Note: With Vite, only variables prefixed with `VITE_` are exposed to the browser.

### 5) Run the server
```bash
cd server
yarn dev            # or: yarn start
```

### 6) Run the client
```bash
cd client
yarn dev
```

- Client: http://localhost:5173
- Server: http://localhost:3001

---

## 🧪 Usage

1. Start both **server** and **client**.
2. Open the app and navigate to a document URL. Common patterns:
     - Auto-generated doc ID on load (e.g., `/documents/:id`)
     - Or paste a known doc ID into the URL to join the same room
3. Open the same document in another browser/tab to see live updates.

---

## ⚙️ Editor Toolbar (Quill)

Typical options enabled:
- Headings (H1–H6), Font
- Ordered/Bullet lists
- Bold / Italic / Underline
- Color / Background
- Subscript / Superscript
- Align
- Image, Blockquote, Code Block
- Clear formatting

---

## 🧲 How it Works (High Level)

- **Room = Document ID**
    Each doc ID maps to a Socket.IO room. All clients in that room receive delta updates.

- **Operational-ish Updates**
    Quill emits deltas on change. Deltas are broadcast to all peers in the room, which apply them locally.

- **Autosave**
    On an interval (e.g., ~2s), the server persists the latest contents to MongoDB.

- **First Load**
    When a client joins, the server returns the latest stored doc (or creates a new one if it doesn’t exist).

---

## 🛡️ Production Notes

- Set strict CORS to your deployed frontend origin.
- Use a dedicated MongoDB user with least privilege.
- Consider **rate limiting** on join/load endpoints.
- Enable **sticky sessions** or use a **Socket.IO adapter** (e.g., Redis) if you scale the server horizontally.
- Add **auth** (e.g., JWT) and **ACLs** for private documents.

---

## 📜 Scripts (common)

**Server**
```jsonc
// server/package.json (examples)
{
    "scripts": {
        "dev": "nodemon index.js",
        "start": "node index.js"
    }
}
```

**Client**
```jsonc
// client/package.json (examples)
{
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    }
}
```

Run with Yarn:
```bash
# server
cd server && yarn dev

# client
cd client && yarn dev
```

---

## 🧰 Troubleshooting

- **Client can’t connect to sockets**
    - Ensure `VITE_SERVER_URL` matches the server base URL.
    - Check CORS and Socket.IO path if you changed defaults.
- **Doc not saving**
    - Verify `MONGO_URI` and network access to MongoDB.
    - Watch server logs for validation errors.
- **Port conflicts**
    - Change `PORT` in `server/.env` or `vite.config.ts` dev server port.

---

## 📦 Future Improvements

- Presence indicators & live cursors
- Commenting / suggestions mode
- Version history & snapshots
- Authentication & sharing permissions
