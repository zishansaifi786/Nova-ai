import { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MessageBubble from './components/MessageBubble';
import { BrandIcon, SendIcon, StopIcon, MenuIcon } from './components/Icons';
import { useChat } from './hooks/useChat';
import './styles.css';

const SUGGESTIONS = ['Explain quantum entanglement','Write a Python web scraper','Give me 5 startup ideas','How does HTTPS work?'];

export default function App() {
  const { chats, activeChat, activeChatId, setActiveChatId, isLoading, streamingContent, systemPrompt, setSystemPrompt, sendMessage, stopGeneration, createNewChat, deleteChat } = useChat();
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [draftPrompt, setDraftPrompt] = useState(systemPrompt);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeChat?.messages, streamingContent]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 180) + 'px';
    }
  }, [input]);

  const handleSend = () => { if (!input.trim() || isLoading) return; sendMessage(input); setInput(''); };
  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <div className="layout">
      {sidebarOpen && (
        <Sidebar chats={chats} activeChatId={activeChatId} setActiveChatId={setActiveChatId} createNewChat={createNewChat} deleteChat={deleteChat} onSettings={() => { setDraftPrompt(systemPrompt); setShowSettings(true); }} />
      )}
      <div className="main">
        <div className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(v => !v)}><MenuIcon /></button>
          <div className="topbar-title">{activeChat?.title || 'New Chat'}</div>
          <div className="model-badge">Sonnet 4</div>
        </div>
        <div className="messages-area">
          <div className="messages-inner">
            {(!activeChat || activeChat.messages.length === 0) && !isLoading ? (
              <div className="welcome">
                <BrandIcon />
                <h1>How can I help?</h1>
                <p>Ask me anything — coding, writing, analysis, math, or just a conversation.</p>
                <div className="welcome-chips">
                  {SUGGESTIONS.map(s => <button key={s} className="chip" onClick={() => { setInput(s); textareaRef.current?.focus(); }}>{s}</button>)}
                </div>
              </div>
            ) : (
              <>
                {activeChat?.messages.map((msg, i) => <MessageBubble key={msg.id || i} msg={msg} isStreaming={false} />)}
                {isLoading && streamingContent === '' && (
                  <div className="msg-row ai-row">
                    <div className="avatar ai-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="url(#g3)" strokeWidth="1.5"/>
                        <circle cx="12" cy="12" r="3.5" fill="url(#g3)"/>
                        <defs><linearGradient id="g3" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#38bdf8"/></linearGradient></defs>
                      </svg>
                    </div>
                    <div className="bubble ai-bubble"><div className="typing-indicator"><span/><span/><span/></div></div>
                  </div>
                )}
                {isLoading && streamingContent !== '' && <MessageBubble msg={{ role: 'assistant', content: streamingContent }} isStreaming />}
              </>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
        <div className="input-area">
          <div className="input-wrap">
            <div className="input-box">
              <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Message Nova AI…" rows={1} />
              {isLoading
                ? <button className="send-btn stop" onClick={stopGeneration}><StopIcon /></button>
                : <button className={"send-btn " + (input.trim() ? 'active' : 'inactive')} onClick={handleSend} disabled={!input.trim()}><SendIcon /></button>
              }
            </div>
            <div className="input-hint">Shift+Enter for new line · Enter to send</div>
          </div>
        </div>
      </div>
      {showSettings && (
        <div className="overlay" onClick={() => setShowSettings(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>⚙️ System Prompt</h2>
            <label>Customize how Nova AI behaves</label>
            <textarea value={draftPrompt} onChange={e => setDraftPrompt(e.target.value)} rows={5} />
            <div className="modal-btns">
              <button className="btn-cancel" onClick={() => setShowSettings(false)}>Cancel</button>
              <button className="btn-save" onClick={() => { setSystemPrompt(draftPrompt); setShowSettings(false); }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
