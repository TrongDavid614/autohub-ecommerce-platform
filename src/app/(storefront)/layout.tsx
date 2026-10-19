// ─── Storefront Layout ────────────────────────────────────────────────────────
// Wraps all public-facing routes with the main site header and footer.

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      {/* TODO: <SiteHeader /> */}
      <main className="flex-1">{children}</main>
      {/* TODO: <SiteFooter /> */}
    </div>
  );
}
