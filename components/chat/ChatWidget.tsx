'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

type ChatState = 'greeting' | 'name' | 'phone' | 'job' | 'time' | 'captured' | 'qa';
type Message = { from: 'bot' | 'user'; text: string };
type QAMsg = { role: 'user' | 'assistant'; content: string };
type LeadDraft = { name: string; phone: string; job: string; time: string };

const GREETING = "Hi! I'm here to help with MJB's Handyman Service. What would you like to do?";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>('greeting');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [draft, setDraft] = useState<LeadDraft>({ name: '', phone: '', job: '', time: '' });
  const [qaHistory, setQaHistory] = useState<QAMsg[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function addBot(text: string) {
    setMessages(prev => [...prev, { from: 'bot', text }]);
  }
  function addUser(text: string) {
    setMessages(prev => [...prev, { from: 'user', text }]);
  }

  // Scroll to the latest message whenever messages change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus the input field whenever the chat panel opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  function toggleChat() {
    if (!isOpen && messages.length === 0) {
      setMessages([{ from: 'bot', text: GREETING }]);
    }
    setIsOpen(prev => !prev);
  }

  // Start the callback lead-capture flow
  function startCallback() {
    addUser('Request a callback');
    setChatState('name');
    addBot("What's your name?");
  }

  // Switch to free Q&A with Claude
  function startQA() {
    addUser('Ask a question');
    setChatState('qa');
    addBot("Sure! What would you like to know about MJB's services?");
  }

  // Skip the optional preferred contact time
  function skipTime() {
    addUser('Skip');
    const finalDraft = { ...draft };
    setIsLoading(true);
    submitLead(finalDraft).finally(() => setIsLoading(false));
  }

  async function submitLead(finalDraft: LeadDraft) {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: finalDraft.name,
          phone: finalDraft.phone,
          jobDescription: finalDraft.job || undefined,
          preferredContactTime: finalDraft.time || undefined,
          source: 'chat',
        }),
      });
      setChatState('captured');
      addBot(
        `Thanks, ${finalDraft.name}! Mark will give you a call soon. ` +
        `You can also reach him directly at (707) 727-3258.`
      );
    } catch {
      addBot("Sorry, something went wrong. Please call (707) 727-3258 directly.");
    }
  }

  async function askClaude(history: QAMsg[]) {
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      const reply: string = data.reply ?? "I'm not sure, but you can call (707) 727-3258 for help.";
      addBot(reply);
      setQaHistory(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      addBot("I'm having trouble right now. Please call (707) 727-3258.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    addUser(text);

    if (chatState === 'name') {
      setDraft(prev => ({ ...prev, name: text }));
      setChatState('phone');
      addBot(`Nice to meet you, ${text}! What's the best phone number to reach you?`);

    } else if (chatState === 'phone') {
      setDraft(prev => ({ ...prev, phone: text }));
      setChatState('job');
      addBot("What kind of work do you need done?");

    } else if (chatState === 'job') {
      setDraft(prev => ({ ...prev, job: text }));
      setChatState('time');
      addBot("Best time to call: morning, afternoon, or evening? (or tap Skip below)");

    } else if (chatState === 'time') {
      const finalDraft = { ...draft, time: text };
      setDraft(finalDraft);
      setIsLoading(true);
      await submitLead(finalDraft);
      setIsLoading(false);

    } else if (chatState === 'qa' || chatState === 'captured') {
      // Append to history before sending so Claude sees the latest message
      const updated: QAMsg[] = [...qaHistory, { role: 'user', content: text }];
      setQaHistory(updated);
      setChatState('qa');
      await askClaude(updated);

    } else if (chatState === 'greeting') {
      // If user types instead of using the quick-reply buttons, go straight to Q&A
      const updated: QAMsg[] = [{ role: 'user', content: text }];
      setQaHistory(updated);
      setChatState('qa');
      await askClaude(updated);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col bg-white">

          {/* Header */}
          <div className="bg-brand-charcoal text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div>
              <p className="font-bold text-sm">MJB&apos;s Handyman</p>
              <p className="text-xs text-brand-green">Santa Rosa, CA</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Message list */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[360px] bg-gray-50"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-brand-green text-brand-charcoal font-medium rounded-br-none'
                      : 'bg-white border border-gray-200 text-brand-charcoal rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick-reply options for the greeting state */}
            {chatState === 'greeting' && messages.length > 0 && (
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={startCallback}
                  className="text-sm border-2 border-brand-green text-brand-charcoal font-semibold px-3 py-2 rounded-xl hover:bg-brand-green transition-colors text-left"
                >
                  📞 Request a callback
                </button>
                <button
                  onClick={startQA}
                  className="text-sm border-2 border-gray-200 text-brand-charcoal font-semibold px-3 py-2 rounded-xl hover:border-brand-green transition-colors text-left"
                >
                  💬 Ask a question
                </button>
              </div>
            )}

            {/* Skip button for the optional contact-time step */}
            {chatState === 'time' && !isLoading && (
              <div className="flex justify-start pt-1">
                <button
                  onClick={skipTime}
                  className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full hover:border-brand-green hover:text-brand-charcoal transition-colors"
                >
                  Skip
                </button>
              </div>
            )}

            {/* Typing indicator while waiting for Claude or lead submit */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <span className="inline-flex gap-1 items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Text input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 flex gap-2 bg-white shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={chatState === 'captured' ? "Any other questions?" : "Type a message..."}
              disabled={isLoading}
              className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-brand-green transition-colors disabled:bg-gray-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send"
              className="bg-brand-green text-brand-charcoal p-2.5 rounded-full hover:brightness-110 transition-all disabled:opacity-40 shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="w-14 h-14 bg-brand-green text-brand-charcoal rounded-full shadow-lg hover:brightness-110 transition-all flex items-center justify-center"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
