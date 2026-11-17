const UNITS = ['元', '万', '亿'];
const THRESHOLDS = [1, 1e4, 1e8];

/** 金额格式化：千分位 + 大额单位（元/万/亿），两位小数 */
export function formatAmount(value: number | string, opts: { withUnit?: boolean } = {}): string {
  const n = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(n)) return '-';

  let unitIdx = 0;
  let v = Math.abs(n);
  for (let i = UNITS.length - 1; i >= 0; i--) {
    if (v >= THRESHOLDS[i]) {
      unitIdx = i;
      break;
    }
  }
  const scaled = n / THRESHOLDS[unitIdx];
  const text = scaled.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return opts.withUnit === false ? text : `${text} ${UNITS[unitIdx]}`;
}

/** 汇率展示：固定 4 位小数 */
export function formatRate(value: number | string): string {
  const n = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(n)) return '-';
  return n.toFixed(4);
}
