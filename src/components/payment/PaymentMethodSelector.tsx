"use client";

export type CheckoutPaymentMethod = "online" | "digipay";

type Props = {
  value: CheckoutPaymentMethod;
  onChange: (value: CheckoutPaymentMethod) => void;
  disabled?: boolean;
  /** موجودی کیف‌پول؛ سمت چپ، هم‌تراز با «پرداخت آنلاین» */
  walletBalance?: number | null;
  onlineHint?: string;
  digipayHint?: string;
};

export function PaymentMethodSelector({
  value,
  onChange,
  disabled,
  walletBalance,
  onlineHint,
  digipayHint,
}: Props) {
  const showWalletBalance = walletBalance != null;

  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="mb-3 block w-full text-right text-sm font-semibold text-[#101117]">
        روش پرداخت
      </legend>

      <label
        className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition ${
          value === "online"
            ? "border-[#416CEA] bg-[#416CEA]/8 ring-1 ring-[#416CEA]/25"
            : "border-[#E5E7EB] bg-white"
        } ${disabled ? "opacity-60" : ""}`}
      >
        <input
          type="radio"
          name="checkout-payment-method"
          className="mt-1 size-5 shrink-0 accent-[#416CEA]"
          checked={value === "online"}
          onChange={() => onChange("online")}
          disabled={disabled}
        />
        <span className="min-w-0 flex-1 text-right">
          <span className="block text-sm font-medium leading-5 text-[#101117]">
            پرداخت آنلاین
          </span>
          {onlineHint ? (
            <span className="mt-0.5 block text-xs leading-5 text-[#6B6C70]">
              {onlineHint}
            </span>
          ) : null}
        </span>
        {showWalletBalance ? (
          <span className="shrink-0 pt-0.5 text-left leading-snug">
            <span className="block text-[10px] font-medium text-[#6B6C70]">
              موجودی کیف پول
            </span>
            <span className="mt-0.5 block text-sm font-extrabold tabular-nums text-[#15803D]">
              {Number(walletBalance).toLocaleString("fa-IR")}{" "}
              <span className="text-[10px] font-semibold text-[#16A34A]">
                تومان
              </span>
            </span>
          </span>
        ) : null}
      </label>

      <label
        className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
          value === "digipay"
            ? "border-[#003eff] bg-[#003eff]/8 ring-1 ring-[#003eff]/25"
            : "border-[#E5E7EB] bg-white"
        } ${disabled ? "opacity-60" : ""}`}
      >
        <input
          type="radio"
          name="checkout-payment-method"
          className="size-5 shrink-0 accent-[#003eff]"
          checked={value === "digipay"}
          onChange={() => onChange("digipay")}
          disabled={disabled}
        />
        <span className="min-w-0 flex-1 text-right">
          <span className="block text-sm font-medium text-[#101117]">
            پرداخت اقساطی دیجی‌پی
          </span>
          {digipayHint ? (
            <span className="mt-0.5 block text-xs leading-5 text-[#6B6C70]">
              {digipayHint}
            </span>
          ) : null}
        </span>
      </label>
    </fieldset>
  );
}
