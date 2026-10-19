import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AutoHub – Xe điện & Phụ kiện chính hãng',
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-50">
      <h1 className="text-4xl font-bold text-sky-400">AutoHub</h1>
      <p className="mt-3 text-slate-400">Đại lý 3S xe điện – Mua xe · Đặt cọc · Lái thử · Phụ kiện</p>
      {/* TODO: <HeroSection /> <FeaturedCars /> <WhyAutohub /> */}
    </main>
  );
}