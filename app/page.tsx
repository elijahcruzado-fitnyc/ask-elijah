import { Avatar } from "@/components/chat/Avatar";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { OpenChatButton } from "@/components/OpenChatButton";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col justify-center gap-8 px-5 py-16">
      <Avatar size={88} />
      <div className="space-y-4">
        <p className="label text-muted">Elijah Cruzado · Senior Product Designer</p>
        <h1 className="text-4xl leading-tight font-medium sm:text-[56px] sm:leading-[64px]">
          I design complex systems and move faster with AI.
        </h1>
        <p className="max-w-xl text-lg leading-[30px] font-light">
          Skip the scrolling. Ask about my experience, my Haleon and Legrand work, or how I use AI in my process, and get a
          short answer with the proof.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <OpenChatButton>Ask Elijah</OpenChatButton>
        <a href="https://elijahcruzado.com" className="btn">
          View portfolio
        </a>
      </div>
      <ChatWidget />
    </main>
  );
}
