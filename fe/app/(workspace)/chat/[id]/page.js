import { ChatSessionPage } from "../../../../components/chat-session-page";

export const metadata = {
  title: "Business Direction Result | Persync",
  description: "Baca kembali hasil analisis arah bisnis Persync.",
};

export default async function ChatPage({ params }) {
  const resolvedParams = await params;

  return <ChatSessionPage id={resolvedParams.id} />;
}
