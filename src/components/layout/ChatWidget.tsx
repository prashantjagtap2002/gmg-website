"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { chatbot } from "@/content/site";
import styles from "./ChatWidget.module.css";

type Message = { role: "bot" | "user"; text: string };

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Escapes the reply, then applies the light markdown the bot uses (bold + bullets). */
function formatBotText(text: string) {
  return escapeHtml(text.trim())
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<strong>$1</strong>")
    .replace(/^[\s]*[*-][\s]+(.+)/gm, "• $1")
    .replace(/\n/g, "<br>");
}

/** n8n responses vary in shape; take the first text-like field we recognise. */
function findFirstText(data: unknown): string | null {
  if (!data) return null;
  const value = Array.isArray(data) ? data[0] : data;
  if (typeof value === "string") return value;
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  for (const key of ["myResult", "output", "text", "message", "content"]) {
    if (typeof record[key] === "string" && record[key]) return record[key] as string;
  }
  if (record.json && typeof record.json === "object") return findFirstText(record.json);
  return JSON.stringify(value);
}

const greeting: Message = { role: "bot", text: chatbot.greeting };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const sessionId = useRef<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    sessionId.current ??= `sess_${Math.random().toString(36).slice(2, 11)}`;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    try {
      const res = await fetch(chatbot.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatInput: text, sessionId: sessionId.current }),
      });
      const reply = findFirstText(await res.json());
      setMessages((m) => [...m, { role: "bot", text: reply || "No response from assistant." }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: "⚠️ Connection error. Please try again." }]);
    } finally {
      setTyping(false);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {open && (
        <div className={styles.window} role="dialog" aria-label={`Chat with ${chatbot.title}`}>
          <div className={styles.header}>
            <div className="flex items-center gap-3">
              <div className={styles.avatar}>
                <Image src={chatbot.profileImage} alt={chatbot.title} className="size-full object-cover" sizes="36px" />
              </div>
              <span className="text-base font-semibold tracking-[-0.2px] text-white">{chatbot.title}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button type="button" title="Clear Chat" className={styles.iconButton} onClick={() => setMessages([greeting])}>
                <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                </svg>
              </button>
              <button type="button" title="Close Window" className={styles.iconButton} onClick={() => setOpen(false)}>
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div ref={listRef} className={styles.messages} aria-live="polite">
            {messages.map((m, i) =>
              m.role === "bot" ? (
                <div key={i} className={`${styles.message} ${styles.bot}`} dangerouslySetInnerHTML={{ __html: formatBotText(m.text) }} />
              ) : (
                <div key={i} className={`${styles.message} ${styles.user}`}>
                  {m.text}
                </div>
              ),
            )}
          </div>
          {typing && (
            <div className={styles.typing} aria-label="Assistant is typing">
              <span />
              <span />
              <span />
            </div>
          )}

          <div className={styles.inputArea}>
            <form className={styles.inputWrapper} onSubmit={send}>
              <textarea
                ref={inputRef}
                className={styles.input}
                placeholder="Ask me anything..."
                rows={1}
                autoComplete="off"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={onKeyDown}
              />
              <button type="submit" className={styles.send} aria-label="Send">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {!open && (
        <button type="button" className={styles.launcher} aria-label={`Chat with ${chatbot.title}`} onClick={() => setOpen(true)}>
          <svg className="size-[26px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </button>
      )}
    </>
  );
}
