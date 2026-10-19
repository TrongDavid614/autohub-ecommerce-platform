// ─── Admin Dashboard Page ─────────────────────────────────────────────────────
// Protected: ROLE_ADMIN only (enforced by proxy.ts)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | AutoHub Admin',
  description: 'Tổng quan KPI kinh doanh, doanh thu và tỷ lệ chuyển đổi đặt cọc.',
};

export default async function AdminDashboardPage() {
  // TODO: const kpis = await adminService.getDashboardKPIs();
  // TODO: const chartData = await adminService.getRevenueChart(6);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-50">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/*
          TODO: <KpiCard title="Tổng doanh thu" value={kpis.totalRevenue} growth={kpis.revenueGrowthPercent} />
          TODO: <KpiCard title="Tổng đặt cọc" value={kpis.totalDeposits} />
          TODO: <KpiCard title="Tỷ lệ chuyển đổi đặt cọc" value={kpis.depositConversionRate} unit="%" />
          TODO: <KpiCard title="Lái thử" value={kpis.totalTestDrives} />
        */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Tổng doanh thu</p>
          <p className="mt-1 text-3xl font-bold text-sky-400">—</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Đặt cọc (tổng)</p>
          <p className="mt-1 text-3xl font-bold text-sky-400">—</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Tỷ lệ chuyển đổi</p>
          <p className="mt-1 text-3xl font-bold text-sky-400">—%</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Lái thử</p>
          <p className="mt-1 text-3xl font-bold text-sky-400">—</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-200">
          Doanh thu 6 tháng gần nhất
        </h2>
        {/* TODO: <RevenueBarChart data={chartData} /> (Recharts) */}
        <div className="h-64 flex items-center justify-center text-slate-500">
          Chart placeholder
        </div>
      </div>
    </div>
  );
}
