import { Loader as Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
      <Loader2 className="animate-spin" />
    </div>
  );
}
