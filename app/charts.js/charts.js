// charts.js — small SVG chart builders for NusaStat. No libraries, no network:
// every chart is drawn from the data passed in, with labelled axes and values.
export function fmt(n, decimals = 2) {
  return Number(n).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function svgOpen(w, h, label) {
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" preserveAspectRatio="xMidYMid meet">`;
}

// Vertical bar chart. rows: [{label, value}], opts: {unit, decimals, color, baseline}
export function barChart(rows, opts = {}) {
  const w = opts.width || 560;
  const h = opts.height || 260;
  const padL = 44;
  const padB = 30;
  const padT = 14;
  const decimals = opts.decimals ?? 1;
  const color = opts.color || "#0f766e";
  const min = Math.min(0, ...rows.map((r) => r.value));
  const max = Math.max(...rows.map((r) => r.value));
  const span = max - min || 1;
  const plotW = w - padL - 12;
  const plotH = h - padT - padB;
  const bw = plotW / rows.length;
  const y = (v) => padT + plotH - ((v - min) / span) * plotH;
  const zeroY = y(0);
  let s = svgOpen(w, h, opts.label || "Bar chart");
  s += `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="#cbd5e1" stroke-width="1"/>`;
  s += `<line x1="${padL}" y1="${zeroY}" x2="${w - 12}" y2="${zeroY}" stroke="#94a3b8" stroke-width="1"/>`;
  // Gridlines at max and mid.
  for (const gv of [max, min + span / 2]) {
    s += `<line x1="${padL}" y1="${y(gv)}" x2="${w - 12}" y2="${y(gv)}" stroke="#e2e8f0" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y(gv) + 4}" text-anchor="end" font-size="11" fill="#64748b">${fmt(gv, decimals)}</text>`;
  }
  rows.forEach((r, i) => {
    const x = padL + i * bw + bw * 0.18;
    const bw2 = bw * 0.64;
    const top = y(Math.max(r.value, 0));
    const bot = r.value >= 0 ? zeroY : y(r.value);
    const hh = Math.max(Math.abs(bot - top), 2);
    const fill = r.value < 0 ? "#b45309" : r.highlight ? "#d97706" : color;
    s += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw2.toFixed(1)}" height="${hh.toFixed(1)}" rx="2" fill="${fill}"><title>${r.label}: ${fmt(r.value, decimals)}${opts.unit ? " " + opts.unit : ""}</title></rect>`;
    s += `<text x="${(x + bw2 / 2).toFixed(1)}" y="${(top - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">${fmt(r.value, decimals)}</text>`;
    s += `<text x="${(x + bw2 / 2).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#64748b">${r.label}</text>`;
  });
  s += "</svg>";
  return s;
}

// Line chart with points and value labels. rows: [{label, value}].
export function lineChart(rows, opts = {}) {
  const w = opts.width || 560;
  const h = opts.height || 260;
  const padL = 44;
  const padB = 30;
  const padT = 18;
  const decimals = opts.decimals ?? 1;
  const color = opts.color || "#0f766e";
  const vals = rows.map((r) => r.value);
  let min = Math.min(...vals);
  let max = Math.max(...vals);
  if (min === max) { min -= 1; max += 1; }
  const pad = (max - min) * 0.15;
  min -= pad;
  max += pad;
  const plotW = w - padL - 16;
  const plotH = h - padT - padB;
  const x = (i) => padL + (i / (rows.length - 1)) * plotW;
  const y = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  let s = svgOpen(w, h, opts.label || "Line chart");
  for (const gv of [min + pad, (min + max) / 2, max - pad]) {
    s += `<line x1="${padL}" y1="${y(gv)}" x2="${w - 16}" y2="${y(gv)}" stroke="#e2e8f0" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y(gv) + 4}" text-anchor="end" font-size="11" fill="#64748b">${fmt(gv, decimals)}</text>`;
  }
  const pts = rows.map((r, i) => `${x(i).toFixed(1)},${y(r.value).toFixed(1)}`).join(" ");
  s += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  rows.forEach((r, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(r.value).toFixed(1)}" r="4" fill="#ffffff" stroke="${color}" stroke-width="2"><title>${r.label}: ${fmt(r.value, decimals)}${opts.unit ? " " + opts.unit : ""}</title></circle>`;
    s += `<text x="${x(i).toFixed(1)}" y="${(y(r.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">${fmt(r.value, decimals)}</text>`;
    s += `<text x="${x(i).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#64748b">${r.label}</text>`;
  });
  s += "</svg>";
  return s;
}

// Donut chart with a centre label. rows: [{label, value, color}].
export function donutChart(rows, opts = {}) {
  const size = opts.size || 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const ir = r * 0.62;
  const total = rows.reduce((a, b) => a + b.value, 0);
  let s = svgOpen(size, size, opts.label || "Donut chart");
  let acc = 0;
  const palette = ["#0f766e", "#d97706", "#0369a1", "#7c3aed", "#be185d", "#65a30d"];
  rows.forEach((row, i) => {
    const frac = row.value / total;
    const a0 = acc * Math.PI * 2 - Math.PI / 2;
    const a1 = (acc + frac) * Math.PI * 2 - Math.PI / 2;
    acc += frac;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + ir * Math.cos(a1);
    const yi1 = cy + ir * Math.sin(a1);
    const xi0 = cx + ir * Math.cos(a0);
    const yi0 = cy + ir * Math.sin(a0);
    const color = row.color || palette[i % palette.length];
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${ir} ${ir} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${color}"><title>${row.label}: ${fmt(row.value, 1)}%</title></path>`;
  });
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="#0f172a">${opts.centre || ""}</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#64748b">${opts.centreSub || ""}</text>`;
  s += "</svg>";
  return s;
}

// Horizontal ranked bars. rows: [{label, value, note}].
export function hbarChart(rows, opts = {}) {
  const w = opts.width || 560;
  const rowH = opts.rowHeight || 30;
  const h = rows.length * rowH + 8;
  const max = Math.max(...rows.map((r) => r.value));
  const color = opts.color || "#0f766e";
  const decimals = opts.decimals ?? 1;
  let s = svgOpen(w, h, opts.label || "Ranked bars");
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = ((r.value / max) * (w - 190)).toFixed(1);
    s += `<text x="0" y="${y + 15}" font-size="12" fill="#334155">${r.label}</text>`;
    s += `<rect x="150" y="${y + 3}" width="${bw}" height="16" rx="3" fill="${r.highlight ? "#d97706" : color}"><title>${r.label}: ${fmt(r.value, decimals)}${opts.unit ? " " + opts.unit : ""}</title></rect>`;
    s += `<text x="${(150 + Number(bw) + 6).toFixed(1)}" y="${y + 16}" font-size="12" font-weight="600" fill="#0f172a">${fmt(r.value, decimals)}${r.note ? " " + r.note : ""}</text>`;
  });
  s += "</svg>";
  return s;
}
