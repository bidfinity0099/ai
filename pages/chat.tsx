import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch (err) {
      console.error('Eroare la trimiterea întrebării:', err);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Chat cu AI</h2>
      <div style={{ minHeight: 300, marginBottom: 20 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '10px 0' }}>
            <strong>{msg.role === 'user' ? 'Tu' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <p><em>AI scrie...</em></p>}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Scrie o întrebare..."
        style={{ width: '100%', padding: 10, fontSize: 16 }}
      />
    </div>
  );
}
