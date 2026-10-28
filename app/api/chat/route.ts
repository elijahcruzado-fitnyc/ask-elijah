import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { LIMITS } from "@/lib/limits";
import { buildInstructions } from "@/lib/system-prompt";
import { tools } from "@/lib/tools";

// The model, the instructions and the content all stay on the server.
// The browser only ever sends the conversation's messages.

const MODEL = process.env.ASK_ELIJAH_MODEL ?? "google/gemini-2.5-flash-lite";

function fail(status: number, message: string) {
  return Response.json({ error: message }, { status });
}

function textOf(message: UIMessage) {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

async function getModel() {
  // Test only: ASK_ELIJAH_MOCK=1 swaps in a scripted model so the route and
  // the UI can be checked without an AI Gateway key or spending credits.
  if (process.env.ASK_ELIJAH_MOCK === "1") {
    const { mockModel } = await import("@/lib/mock-model");
    return mockModel();
  }
  return MODEL;
}

export async function POST(req: Request) {
  let messages: UIMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return fail(400, "That request didn't look right. Try sending your question again.");
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return fail(400, "Ask a question to get started.");
  }
  if (messages.some((m) => m.role !== "user" && m.role !== "assistant")) {
    return fail(400, "That request didn't look right. Try sending your question again.");
  }

  const userMessages = messages.filter((m) => m.role === "user");
  if (userMessages.length > LIMITS.maxUserMessages) {
    return fail(
      429,
      `This conversation has reached its limit of ${LIMITS.maxUserMessages} questions. Start a new chat, or reach Elijah on LinkedIn.`,
    );
  }
  for (const m of userMessages) {
    const text = textOf(m).trim();
    if (!text) return fail(400, "Your message was empty. Type a question and send it again.");
    if (text.length > LIMITS.maxMessageChars) {
      return fail(400, `Keep questions under ${LIMITS.maxMessageChars} characters.`);
    }
  }

  if (process.env.ASK_ELIJAH_MOCK !== "1" && !process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
    return fail(503, "The assistant isn't connected yet. Add AI_GATEWAY_API_KEY to .env.local and restart the server.");
  }

  const result = streamText({
    model: await getModel(),
    instructions: buildInstructions(),
    messages: await convertToModelMessages(messages),
    tools,
    stopWhen: isStepCount(LIMITS.maxSteps),
    temperature: 0.3,
    maxOutputTokens: 400,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      tools,
      originalMessages: messages,
      onError: () => "Something went wrong on my side. Try again in a moment.",
    }),
  });
}
