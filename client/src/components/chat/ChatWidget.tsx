"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Bot, Send, X, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/**
 * Public support chatbot, launched from a floating button on every marketing
 * page. Answers are grounded in the retrieval corpus behind /api/chat.
 *
 * Visual language is lifted from the scripted `ChatbotMock` in the homepage
 * AIDemo section so the real assistant reads as the same product rather than a
 * bolted-on third-party widget.
 */

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What services do you offer?",
  "How much does a pilot cost?",
  "Which industries do you work in?",
];

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Hi — I can answer questions about Technovate AI: our services, pricing, industries, case studies, and open roles. What would you like to know?",
};

export function ChatWidget() {
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([GREETING]);
  const [input, setInput] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const launcherRef = React.useRef<HTMLButtonElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  /* Keep the transcript pinned to the newest message as tokens stream in. */
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  /* Focus the input on open; return focus to the launcher on close. */
  React.useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    launcherRef.current?.focus();
  }, [open]);

  /* Escape closes the panel from anywhere inside it. */
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* Abort an in-flight stream if the widget unmounts mid-answer. */
  React.useEffect(() => () => abortRef.current?.abort(), []);

  const send = React.useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || pending) return;

      setError(null);
      setInput("");
      setPending(true);

      const userMessage: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: question,
      };
      const assistantId = `a-${Date.now()}`;

      // History is captured *before* the new turn is appended, so the request
      // carries prior context without duplicating the question being asked.
      const history = messages
        .filter((m) => m.id !== "greeting")
        .map(({ role, content }) => ({ role, content }));

      setMessages((prev) => [
        ...prev,
        userMessage,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: question, history }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error ?? "Something went wrong. Please try again.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m,
            ),
          );
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        // Drop the empty assistant bubble and surface the failure instead.
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        setError((err as Error).message);
      } finally {
        setPending(false);
        abortRef.current = null;
      }
    },
    [messages, pending],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const showSuggestions = messages.length === 1 && !pending;

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close chat" : "Chat with us"}
        className={cn(
          "fixed bottom-5 right-5 z-[70] inline-flex size-14 items-center justify-center rounded-full",
          "bg-gradient-brand text-white shadow-elevation-lg transition-transform duration-250 ease-out-expo",
          "hover:-translate-y-0.5 hover:shadow-glow-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
          "lg:bottom-6 lg:right-6",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={reduced ? false : { opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={reduced ? undefined : { opacity: 0, rotate: 90 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="chat-panel"
            role="dialog"
            aria-label="Chat with Technovate AI"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed z-[70] flex flex-col overflow-hidden rounded-xl border border-dark/10 bg-white shadow-elevation-xl",
              // Full-bleed sheet on phones, anchored panel from sm up.
              "inset-x-3 bottom-24 top-16",
              "sm:inset-auto sm:bottom-24 sm:right-5 sm:top-auto sm:h-[min(34rem,calc(100dvh-9rem))] sm:w-[24rem]",
              "lg:bottom-24 lg:right-6",
            )}
          >
            <header className="flex items-center justify-between gap-3 border-b border-dark/10 px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-gradient-brand text-white">
                  <Bot className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-small-14 font-semibold text-dark">
                    Technovate AI Assistant
                  </p>
                  <p className="truncate text-[11px] text-dark-500">
                    Answers from our published information
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm" leadingDot>
                Online
              </Badge>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto p-4 text-small-14"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[88%] whitespace-pre-wrap rounded-lg px-3 py-2 leading-relaxed",
                    m.role === "user"
                      ? "ml-auto bg-primary text-white"
                      : "mr-auto bg-light-200 text-dark",
                  )}
                >
                  {m.content ||
                    (pending && m.role === "assistant" ? (
                      <span className="inline-flex items-center gap-1 py-1">
                        <span className="size-1.5 animate-bounce rounded-full bg-dark-400 [animation-delay:-0.3s]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-dark-400 [animation-delay:-0.15s]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-dark-400" />
                        <span className="sr-only">Assistant is typing</span>
                      </span>
                    ) : null)}
                </div>
              ))}

              {showSuggestions && (
                <ul className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => void send(s)}
                        className="rounded-full border border-dark/10 bg-white px-3 py-1.5 text-[13px] text-dark-700 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {error && (
                <p role="alert" className="mr-auto rounded-lg bg-error/10 px-3 py-2 text-error">
                  {error}
                </p>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-dark/10 p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Ask a question about Technovate AI
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1000}
                autoComplete="off"
                disabled={pending}
                placeholder="Ask about services, pricing, industries…"
                className="h-11 flex-1 rounded-md border border-dark/10 bg-white px-3 text-body-16 text-dark outline-none transition-colors placeholder:text-dark-400 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-60 sm:text-small-14"
              />
              <Button
                type="submit"
                variant="primary"
                size="icon"
                disabled={pending || !input.trim()}
                aria-label="Send message"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
