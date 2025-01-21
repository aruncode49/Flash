import ChatView from "@/components/custom/chatView";
import CodeView from "@/components/custom/codeView";

export default function WorkspacePage() {
  return (
    <div className="grid grid-cols-3 gap-5 py-3 h-full min-w-[900px] overflow-x-auto">
      <ChatView />
      <div className="col-span-2">
        <CodeView />
      </div>
    </div>
  );
}
