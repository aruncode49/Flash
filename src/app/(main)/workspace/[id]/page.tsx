import ChatView from "@/components/custom/chatView";
import CodeView from "@/components/custom/codeView";

export default function WorkspacePage() {
  return (
    <div className="grid grid-cols-3 gap-8 py-3 h-full">
      <ChatView />
      <div className="col-span-2">
        <CodeView />
      </div>
    </div>
  );
}
