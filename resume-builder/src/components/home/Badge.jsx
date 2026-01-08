import { Zap } from "lucide-react";
export default function Badge() {
  return (
    <div className="flex items-center gap-2 w-45 m-auto text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-6 py-1.5">
      <Zap width={14} />
      <span>Simple Process</span>
    </div>
  );
}
