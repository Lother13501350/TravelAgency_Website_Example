export function formatPrice(price: number): string {
  return `NT$${new Intl.NumberFormat('zh-TW').format(price)}`;
}
