// ─── Admin Car Master Data Page ───────────────────────────────────────────────
// Protected: ROLE_ADMIN only (enforced by proxy.ts)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý xe | AutoHub Admin',
  description: 'CRUD xe điện, quản lý phiên bản và xóa mềm.',
};

type SearchParams = Promise<{
  includeDeleted?: string;
  page?: string;
  search?: string;
}>;

export default async function AdminCarsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { includeDeleted, page, search } = await searchParams;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-50">Quản lý xe điện</h1>
        {/* TODO: <AddCarModelButton /> */}
        <button className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400">
          + Thêm xe mới
        </button>
      </div>

      {/*
        TODO: <CarMasterDataTable
          includeDeleted={includeDeleted === 'true'}
          page={Number(page ?? 1)}
          search={search}
        />
        Columns: Thumbnail | Model | Brand | Year | Variants | Status | Actions
        Actions: Edit, Soft Delete, Restore (if deleted)
        Row hover: zinc-800
        Deleted rows: opacity-50 with "Đã xóa" badge
      */}

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">
        Bảng quản lý xe sẽ hiển thị ở đây.
        <br />
        <code className="text-xs">includeDeleted={includeDeleted} page={page} search={search}</code>
      </div>
    </div>
  );
}
