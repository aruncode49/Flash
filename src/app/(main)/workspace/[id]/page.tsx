import ChatView from "@/components/custom/chatView";
import CodeView from "@/components/custom/codeView";

export default function WorkspacePage() {
  return (
    <div className="grid grid-cols-3 gap-8 pt-5 h-full pb-7">
      <ChatView />
      <div className="col-span-2">
        <CodeView />
      </div>
    </div>
  );
}
