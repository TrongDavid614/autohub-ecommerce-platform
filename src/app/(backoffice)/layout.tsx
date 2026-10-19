// ─── Backoffice Layout ────────────────────────────────────────────────────────
// Wraps admin + staff routes with the backoffice sidebar navigation.
// Access is enforced by proxy.ts before this layout is reached.

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-900 text-slate-50">
      {/* TODO: <BackofficeSidebar /> */}
      <div className="flex flex-1 flex-col">
        {/* TODO: <BackofficeTopbar /> */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
