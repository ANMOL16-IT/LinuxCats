import { Activity, Github } from "lucide-react";
import { Skiper39 } from "@/components/ui/skiper39";
import { Button } from "@/components/ui/button";
import type { Snapshot } from "@/lib/api";
import { fmtBytes } from "@/lib/utils";

export default function Landing({ snap, offline }: { snap: Snapshot | null; offline: boolean }) {
  const status = offline ? "Collector offline — run npm start" : !snap ? "Connecting to collector…"
    : `${snap.host} · ${snap.filesystems.length} filesystems · ${fmtBytes(snap.summary.used)} of ${fmtBytes(snap.summary.total)} used · ${snap.summary.critical + snap.summary.warning} active alerts`;
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Skiper39>
        <h1 className="font-display text-5xl font-medium text-black sm:text-7xl md:text-8xl">Black and White cats</h1>
        <p className="mt-4 text-lg font-medium text-black/60 sm:text-xl">Linux Storage Monitoring System</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="bg-black text-white hover:bg-black/85" asChild><a href="#/dashboard"><Activity className="mr-2 size-4" />Dashboard</a></Button>
          <Button size="lg" variant="secondary" className="border border-black/15 bg-white/70 text-black hover:bg-black/5" asChild><a href="#/faq"><Github className="mr-2 size-4" />FAQ &amp; team</a></Button>
        </div>
        <p className="mt-6 text-xs text-black/50">{status}</p>
      </Skiper39>
      <a href="https://21st.dev/community/components/s/hero?preview=%2F%40reuno-ui%2Fcomponents%2Fskiper39" target="_blank" rel="noreferrer" className="absolute bottom-3 right-4 z-10 text-[10px] text-black/40 hover:text-black/70">Crowd canvas: Skiper UI · illustrations: openpeeps.com</a>
    </div>
  );
}
