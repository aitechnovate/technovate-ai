"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Workflow, BarChart3, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  /** Optional citation entries rendered as chips below the message. */
  citations?: string[];
};

type DemoProps = {
  className?: string;
};

/* ---- Chatbot mock ---- */

const presetReplies: Record<string, Message[]> = {
  greeting: [
    {
      id: "r1",
      role: "user",
      text: "What did Northwind Health do last quarter?",
    },
    {
      id: "r2",
      role: "assistant",
      text: "Northwind Health deployed the Clinical Documentation Copilot across 14 clinics. Average documentation time fell 47% and clinician satisfaction rose to 4.7/5. They saved an estimated $3.2M in annualized clinician time.",
      citations: ["Q1 board memo", "EHR audit logs", "Clinician NPS survey"],
    },
  ],
  rag: [
    {
      id: "r1",
      role: "user",
      text: "Compare Atlas Capital's RAG accuracy to industry baselines.",
    },
    {
      id: "r2",
      role: "assistant",
      text: "Atlas Capital's RAG system lands at 97% grounded-answer accuracy on a 1,200-question benchmark, compared to an industry baseline of ~71% (RAGAS, 2025). They also tuned the retriever for citation precision over recall — every claim links back to a source.",
      citations: ["Internal eval suite", "RAGAS paper"],
    },
  ],
};

function ChatbotMock() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      text:
        "Ask me anything about Technovate AI's case studies and engineering notes. Answers are grounded in our published work.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [typing, setTyping] = React.useState(false);

  const send = (prompt: string) => {
    if (!prompt) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      const key = prompt.toLowerCase().includes("rag") ? "rag" : "greeting";
      const replies = presetReplies[key];
      setMessages((prev) => [...prev, ...replies]);
      setTyping(false);
    }, 700);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-dark/10 bg-white shadow-elevation-md">
      <div className="flex items-center justify-between border-b border-dark/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-gradient-blue-cyan text-white">
            <Bot className="size-4" />
          </span>
          <div>
            <p className="font-display text-small-14 font-semibold">
              RAG Copilot
            </p>
            <p className="text-[11px] text-dark-500">
              Demo · answers are scripted
            </p>
          </div>
        </div>
        <Badge variant="success" size="sm" leadingDot>
          Live
        </Badge>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-small-14">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "max-w-[88%] rounded-lg px-3 py-2 leading-relaxed",
              m.role === "user"
                ? "ml-auto bg-primary text-white"
                : "mr-auto bg-light-200 text-dark",
            )}
          >
            {m.text}
            {m.citations && (
              <ul className="mt-2 flex flex-wrap gap-1">
                {m.citations.map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-dark-500 border border-dark/10"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mr-auto inline-flex items-center gap-1 rounded-lg bg-light-200 px-3 py-2 text-dark-500"
            >
              <span className="size-1.5 animate-bounce rounded-full bg-dark-400 [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-dark-400 [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-dark-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-t border-dark/10 p-3"
      >
        <input
          type="text"
          aria-label="Ask the copilot"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try: ‘What did Northwind Health do?’"
          className="flex-1 rounded-md border border-dark/10 bg-white px-3 py-2 text-small-14 outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        />
        <button
          type="submit"
          aria-label="Send"
          className="inline-flex size-9 items-center justify-center rounded-md bg-primary text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}

/* ---- Workflow visualizer ---- */

function WorkflowMock() {
  const steps = [
    { label: "Intake email", icon: "📥", color: "bg-primary" },
    { label: "Parse + classify", icon: "🧠", color: "bg-accent" },
    { label: "RAG lookup", icon: "🔎", color: "bg-secondary text-dark" },
    { label: "Draft reply", icon: "✍️", color: "bg-success" },
    { label: "Human review", icon: "👤", color: "bg-warning" },
    { label: "Send", icon: "📤", color: "bg-primary" },
  ];

  return (
    <div className="h-full overflow-hidden rounded-xl border border-dark/10 bg-white p-6 shadow-elevation-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-h4-24">Agent workflow</h3>
        <Badge variant="default" size="sm">
          Support agent
        </Badge>
      </div>
      <p className="mb-6 text-small-14 text-dark-500">
        Every step is auditable, replayable, and reversible.
      </p>
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: idx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-3 rounded-lg border border-dark/10 bg-light-200 p-3"
          >
            <span
              className={cn(
                "inline-flex size-9 shrink-0 items-center justify-center rounded-md text-small-14 text-white shadow-elevation-xs",
                step.color,
              )}
            >
              {step.icon}
            </span>
            <span className="text-small-14 font-medium text-dark">
              {step.label}
            </span>
            {idx < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="ml-auto h-px w-6 bg-dark/20"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---- Mini chart ---- */

function ChartMock() {
  const data = [22, 28, 35, 31, 42, 48, 55, 62, 58, 68, 74, 82];
  const max = Math.max(...data);
  return (
    <div className="h-full overflow-hidden rounded-xl border border-dark/10 bg-white p-6 shadow-elevation-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-h4-24">Tickets resolved by AI</h3>
          <p className="text-small-14 text-dark-500">
            Rolling 12 months · Northwind Health
          </p>
        </div>
        <Badge variant="success" size="sm" leadingDot>
          +260% YoY
        </Badge>
      </div>
      <div className="flex h-44 items-end gap-2" aria-hidden="true">
        {data.map((v, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${(v / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-secondary"
            title={`${v}%`}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-dark-500">
        {["Jan", "Apr", "Jul", "Oct", "Dec"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/* ---- Section wrapper ---- */

export function AIDemo({ className }: DemoProps) {
  return (
    <Section
      spacing="lg"
      tone="default"
      className={className}
      containerSize="wide"
    >
      <div className="mb-12 max-w-2xl">
        <Badge variant="accent" size="sm" className="mb-3">
          <Sparkles className="size-3" /> Live demos
        </Badge>
        <h2 className="font-display text-h1-48 text-balance">
          AI you can{" "}
          <span className="text-gradient-brand">try, not just read about.</span>
        </h2>
        <p className="mt-3 text-body-16 text-dark-600">
          A scripted chatbot, a typical agent workflow, and a real chart from
          one of our engagements. No API calls — just a feel for how the
          pieces fit together.
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="chat">
            <Bot className="size-3.5 mr-2" aria-hidden="true" /> Chatbot
          </TabsTrigger>
          <TabsTrigger value="workflow">
            <Workflow className="size-3.5 mr-2" aria-hidden="true" /> Workflow
          </TabsTrigger>
          <TabsTrigger value="chart">
            <BarChart3 className="size-3.5 mr-2" aria-hidden="true" /> Analytics
          </TabsTrigger>
        </TabsList>
        {/* Fixed height (the mock scrolls internally) — shortened on phones. */}
        <TabsContent value="chat" className="h-[26rem] sm:h-[30rem]">
          <ChatbotMock />
        </TabsContent>
        <TabsContent value="workflow">
          <WorkflowMock />
        </TabsContent>
        <TabsContent value="chart">
          <ChartMock />
        </TabsContent>
      </Tabs>
    </Section>
  );
}