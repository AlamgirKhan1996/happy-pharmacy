import { pkrMinorToMajor } from "./catalogue-query";
import { siteConfig } from "./site";

const pkrFormatter = new Intl.NumberFormat(siteConfig.currencyLocale, {
  style: "currency",
  currency: siteConfig.currency,
  maximumFractionDigits: 0,
});

const pkrMinorFormatter = new Intl.NumberFormat(siteConfig.currencyLocale, {
  style: "currency",
  currency: siteConfig.currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPkr(amount: number): string {
  return pkrFormatter.format(amount);
}

export function formatPkrMinor(minorUnits: number): string {
  return pkrMinorFormatter.format(pkrMinorToMajor(minorUnits));
}
