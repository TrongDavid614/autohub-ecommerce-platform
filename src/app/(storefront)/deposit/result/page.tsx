// ─── Deposit Result / Electronic Receipt Page ─────────────────────────────────
// Verifies VNPay IPN return parameters and displays receipt
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kết quả thanh toán | AutoHub',
  description: 'Xác nhận kết quả đặt cọc xe qua VNPay.',
};

type SearchParams = Promise<{
  vnp_Amount?: string;
  vnp_BankCode?: string;
  vnp_OrderInfo?: string;
  vnp_ResponseCode?: string;
  vnp_TxnRef?: string;
  vnp_SecureHash?: string;
  [key: string]: string | undefined;
}>;

export default async function DepositResultPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const isSuccess = params.vnp_ResponseCode === '00';

  return (
    <section className="container mx-auto max-w-xl px-4 py-16 text-center">
      {isSuccess ? (
        <>
          <div className="mb-4 text-6xl">✅</div>
          <h1 className="mb-2 text-2xl font-bold text-sky-400">
            Đặt cọc thành công!
          </h1>
          <p className="mb-6 text-slate-400">
            Mã giao dịch: <span className="font-mono text-slate-200">{params.vnp_TxnRef}</span>
          </p>
        </>
      ) : (
        <>
          <div className="mb-4 text-6xl">❌</div>
          <h1 className="mb-2 text-2xl font-bold text-red-400">
            Thanh toán thất bại
          </h1>
          <p className="mb-6 text-slate-400">
            Mã lỗi: <span className="font-mono">{params.vnp_ResponseCode}</span>
          </p>
        </>
      )}

      {/*
        TODO: <DepositReceiptCard params={params} />
        - Call depositService.verifyPayment(params) server-side
        - Display: mã đặt cọc, tên người mua, CCCD, showroom, xe, màu, số tiền, thời hạn 72h
        - Download PDF receipt button
      */}
    </section>
  );
}
