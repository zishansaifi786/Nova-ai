# Nova AI 🤖

A full-featured, ChatGPT-like AI chat app powered by Claude.

## Project Structure

```
nova-ai/
├── index.html                  # App entry point
├── package.json                # Dependencies
├── vite.config.js              # Vite config
├── src/
│   ├── main.jsx                # React root
│   ├── App.jsx                 # Root component
│   ├── styles.css              # Global styles
│   ├── components/
│   │   ├── Icons.jsx           # All SVG icons
│   │   ├── Sidebar.jsx         # Chat history sidebar
│   │   └── MessageBubble.jsx   # Message renderer
│   ├── hooks/
│   │   └── useChat.js          # Chat state & API logic
│   └── utils/
│       ├── api.js              # Anthropic streaming API
│       └── formatMessage.js    # Markdown → HTML parser
└── public/                     # Static assets
```

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Features
- ✅ Real-time streaming responses
- ✅ Multiple chat sessions with sidebar
- ✅ Markdown rendering (bold, italic, headings, lists, code blocks)
- ✅ Stop generation mid-stream
- ✅ Customizable system prompt
- ✅ One-click copy on messages
- ✅ Auto-expanding textarea
- ✅ Collapsible sidebar
