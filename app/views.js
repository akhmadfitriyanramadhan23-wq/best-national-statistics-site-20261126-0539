// views.js — the five pages of NusaStat. Each view is a function returning HTML;
// main.js mounts it, wires its controls and re-renders on state changes.
import { HEADLINE, SERIES, AGE_STRUCTURE, PROVINCES, WELLBEING, RELEASES, INDICATORS, tradeBalance, seriesValue } from "./data.js";
import { barChart, lineChart, donutChart, hbarChart, fmt } from "./charts.js";

export function sourceLine(text) {
  return `<p class="src">Source: ${text}</p>`;
}

function kpiCards() {
  return `<div class="kpis">` + HEADLINE.map((k) => `
    <article class="kpi">
      <h3>${k.label}</h3>
      <p class="big">${k.value}</p>
      <p class="sub">${k.sub}</p>
      <p class="tag">${k.source}</p>
    </article>`).join("") + `</div>`;
}

function releasesList() {
  return `<ul class="releases">` + RELEASES.map((r) => `
    <li><span class="rdate">${r.date}</span><span class="rtag">${r.tag}</span><span class="rtitle">${r.title}</span></li>`).join("") + `</ul>`;
}

export function viewOverview() {
  const growth = SERIES.gdpGrowth.map((r) => ({ label: String(r.year), value: r.value, highlight: r.year === 2024 }));
  const top5 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5)
    .map((p) => ({ label: p.name, value: p.pop, note: "m" }));
  const age = AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.share }));
  return `
  <section class="hero">
    <p class="eyebrow">Indonesia · National statistics · Updated 26 November 2026</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">The country's people, economy and regions — every figure sourced, dated and
    ready to compare. Start with the headlines, then dig into the economy, the people,
    the provinces, or the full indicator list.</p>
    <nav class="quicklinks" aria-label="Start here">
      <a href="#/economy">Economy →</a>
      <a href="#/people">People →</a>
      <a href="#/regions">Provinces →</a>
      <a href="#/data">All indicators →</a>
    </nav>
  </section>
  ${kpiCards()}
  <div class="grid2">
    <section class="card">
      <h2>Real GDP growth, 2019–2024</h2>
      <p class="cardsub">Percent change year-on-year. The 2020 contraction is the pandemic year;
      growth has held above 5% since 2022.</p>
      ${barChart(growth, { label: "GDP growth 2019 to 2024", unit: "%", decimals: 2 })}
      ${sourceLine("BPS national accounts, 2019–2024.")}
    </section>
    <section class="card">
      <h2>Who lives here — age structure 2024</h2>
      <p class="cardsub">Nearly seven in ten Indonesians are of working age (15–64).</p>
      <div class="donutwrap">
        ${donutChart(age, { label: "Age structure 2024", centre: "281.6m", centreSub: "people, 2024" })}
        <ul class="legend">${AGE_STRUCTURE.map((a, i) => `<li><span class="sw" style="background:${["#0f766e", "#d97706", "#0369a1"][i]}"></span>${a.group} — <b>${a.share}%</b> (${a.people})</li>`).join("")}</ul>
      </div>
      ${sourceLine("BPS population projection, 2024.")}
    </section>
  </div>
  <div class="grid2">
    <section class="card">
      <h2>Largest provinces by population, 2024</h2>
      <p class="cardsub">Java holds more than half the country: West, East and Central Java alone
      are 129.6 million people.</p>
      ${hbarChart(top5, { label: "Largest provinces 2024", unit: "m", decimals: 2 })}
      ${sourceLine("BPS mid-year provincial estimates, 2024.")}
      <p><a class="morelink" href="#/regions">See all 38 provinces →</a></p>
    </section>
    <section class="card">
      <h2>Latest releases</h2>
      <p class="cardsub">What the newest figures say, by reference period.</p>
      ${releasesList()}
      ${sourceLine("BPS release calendar; figures as published.")}
    </section>
  </div>`;
}

export function viewEconomy(state) {
  const year = state.year;
  const growth = SERIES.gdpGrowth.map((r) => ({ label: String(r.year), value: r.value, highlight: r.year === year }));
  const infl = SERIES.inflation.map((r) => ({ label: String(r.year), value: r.value, highlight: r.year === year }));
  const trade = SERIES.exports.map((r) => ({ label: String(r.year), value: tradeBalance(r.year), highlight: r.year === year }));
  const gdp = seriesValue("gdpNominal", year);
  const gdpPc = seriesValue("gdpPerCapitaUsd", year);
  const unemp = seriesValue("unemployment", year);
  const pov = SERIES.poverty.find((r) => r.year === year);
  const options = SERIES.gdpGrowth.map((r) => `<option value="${r.year}"${r.year === year ? " selected" : ""}>${r.year}</option>`).join("");
  return `
  <section class="pagehead">
    <p class="eyebrow">Economy</p>
    <h1>Growth, prices, jobs and trade</h1>
    <p class="lede">Pick a year and the headline cards follow it; the charts show the whole
    2019–2024 run so a single year never hides the trend.</p>
    <label class="yearpick">Year
      <select id="yearSelect" aria-label="Choose year">${options}</select>
    </label>
  </section>
  <div class="kpis">
    <article class="kpi"><h3>GDP growth (${year})</h3><p class="big">${fmt(seriesValue("gdpGrowth", year), 2)}%</p><p class="sub">real, year-on-year</p><p class="tag">BPS ${year}</p></article>
    <article class="kpi"><h3>GDP, current prices (${year})</h3><p class="big">Rp ${fmt(gdp, 1)}tn</p><p class="sub">US$ ${fmt(gdpPc, 0)} per person</p><p class="tag">BPS ${year}</p></article>
    <article class="kpi"><h3>Inflation (${year})</h3><p class="big">${fmt(seriesValue("inflation", year), 2)}%</p><p class="sub">December, year-on-year</p><p class="tag">BPS ${year}</p></article>
    <article class="kpi"><h3>Unemployment (${year})</h3><p class="big">${unemp !== null ? fmt(unemp, 2) + "%" : "—"}</p><p class="sub">August survey${year === 2024 ? " · Feb 2025: 4.76%" : ""}</p><p class="tag">BPS ${year}</p></article>
    <article class="kpi"><h3>Poverty (${year})</h3><p class="big">${pov ? fmt(pov.value, 2) + "%" : "—"}</p><p class="sub">${pov ? pov.note + " survey" : ""}</p><p class="tag">BPS ${year}</p></article>
    <article class="kpi"><h3>Trade balance (${year})</h3><p class="big">US$ ${fmt(tradeBalance(year), 1)}bn</p><p class="sub">exports minus imports</p><p class="tag">BPS ${year}</p></article>
  </div>
  <div class="grid2">
    <section class="card">
      <h2>Real GDP growth, 2019–2024</h2>
      <p class="cardsub">Annual change in constant-price GDP. The selected year is highlighted in amber.</p>
      ${lineChart(growth, { label: "GDP growth line 2019 to 2024", unit: "%", decimals: 2 })}
      ${sourceLine("BPS national accounts.")}
    </section>
    <section class="card">
      <h2>Inflation, 2019–2024</h2>
      <p class="cardsub">Consumer prices, December year-on-year. The 2022 spike followed the
      subsidised-fuel price adjustment; 2024 ended at 1.57%.</p>
      ${lineChart(infl, { label: "Inflation 2019 to 2024", unit: "%", decimals: 2, color: "#b45309" })}
      ${sourceLine("BPS consumer price survey.")}
    </section>
  </div>
  <section class="card">
    <h2>Trade balance, 2019–2024 (US$ billion)</h2>
    <p class="cardsub">Exports minus imports. Indonesia has run a goods surplus every year since 2020;
    2024 exports were US$ 264.7bn against imports of US$ 233.7bn.</p>
    ${barChart(trade, { label: "Trade balance 2019 to 2024", unit: "US$ bn", decimals: 1, color: "#0369a1" })}
    ${sourceLine("BPS trade statistics.")}
  </section>
  <section class="card">
    <h2>Economy at a glance — ${year}</h2>
    <table class="data" id="econTable">
      <thead><tr><th data-sort="name">Indicator</th><th data-sort="value">Value (${year})</th><th>Source</th></tr></thead>
      <tbody>
        <tr><td>GDP, current prices</td><td>Rp ${fmt(gdp, 1)} trillion</td><td>BPS</td></tr>
        <tr><td>GDP growth, real</td><td>${fmt(seriesValue("gdpGrowth", year), 2)}%</td><td>BPS</td></tr>
        <tr><td>GDP per capita</td><td>US$ ${fmt(gdpPc, 0)}</td><td>BPS</td></tr>
        <tr><td>Inflation (December y-on-y)</td><td>${fmt(seriesValue("inflation", year), 2)}%</td><td>BPS</td></tr>
        <tr><td>Exports</td><td>US$ ${fmt(seriesValue("exports", year), 1)}bn</td><td>BPS</td></tr>
        <tr><td>Imports</td><td>US$ ${fmt(seriesValue("imports", year), 1)}bn</td><td>BPS</td></tr>
        <tr><td>Trade balance</td><td>US$ ${fmt(tradeBalance(year), 1)}bn</td><td>BPS</td></tr>
        <tr><td>Unemployment (August)</td><td>${unemp !== null ? fmt(unemp, 2) + "%" : "n/a"}</td><td>BPS</td></tr>
        <tr><td>Human Development Index</td><td>${fmt(seriesValue("hdi", year), 2)}</td><td>BPS</td></tr>
      </tbody>
    </table>
    <p class="hint">Click a column heading to sort the table.</p>
  </section>`;
}

function provinceRows(list) {
  return list.map((p, i) => {
    const density = Math.round((p.pop * 1e6) / p.area);
    const share = ((p.pop / 281.6) * 100).toFixed(2);
    return `<tr><td>${i + 1}</td><td>${p.name}</td><td data-num="${p.pop}">${fmt(p.pop, 2)}</td><td data-num="${density}">${density.toLocaleString("en-US")}</td><td data-num="${share}">${share}%</td></tr>`;
  }).join("");
}

export function viewPeople(state) {
  const q = (state.q || "").toLowerCase();
  const sorted = [...PROVINCES].sort((a, b) => b.pop - a.pop);
  const filtered = q ? sorted.filter((p) => p.name.toLowerCase().includes(q)) : sorted;
  const age = AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.share }));
  return `
  <section class="pagehead">
    <p class="eyebrow">People</p>
    <h1>281.6 million people</h1>
    <p class="lede">A young, urbanising country: a median age near 30, two-thirds of working age,
    and more than half the population now living in towns and cities.</p>
  </section>
  <div class="grid2">
    <section class="card">
      <h2>Age structure, 2024</h2>
      <p class="cardsub">Share of the population by broad age group.</p>
      <div class="donutwrap">
        ${donutChart(age, { label: "Age structure 2024", centre: "68.8%", centreSub: "aged 15–64" })}
        <ul class="legend">${AGE_STRUCTURE.map((a, i) => `<li><span class="sw" style="background:${["#0f766e", "#d97706", "#0369a1"][i]}"></span>${a.group} — <b>${a.share}%</b> (${a.people})</li>`).join("")}</ul>
      </div>
      ${sourceLine("BPS population projection, 2024.")}
    </section>
    <section class="card">
      <h2>Health &amp; education, 2024</h2>
      <p class="cardsub">Each figure with its source and year — the same numbers as the Data page.</p>
      <ul class="wellbeing">${WELLBEING.map((w) => `<li><span>${w.label}</span><b>${w.value}</b><i>${w.source}</i></li>`).join("")}</ul>
      ${sourceLine("BPS 2024; stunting: SSGI (Ministry of Health) 2024.")}
    </section>
  </div>
  <section class="card">
    <h2>Population by province, 2024</h2>
    <p class="cardsub">Mid-year estimates. Search to filter; click a heading to sort.</p>
    <label class="search">Search provinces
      <input id="provSearch" type="search" placeholder="e.g. Java, Papua, Bali" value="${state.q || ""}" aria-label="Search provinces">
    </label>
    <table class="data" id="provTable">
      <thead><tr><th>#</th><th data-sort="name">Province</th><th data-sort="pop">Population (m)</th><th data-sort="density">Density (per km²)</th><th data-sort="share">Share of Indonesia</th></tr></thead>
      <tbody>${provinceRows(filtered)}</tbody>
    </table>
    <p class="hint" id="provCount">${filtered.length} of 38 provinces shown.</p>
    ${sourceLine("BPS mid-year provincial estimates, 2024. Density = population ÷ land area.")}
  </section>`;
}

export function viewRegions(state) {
  const selected = PROVINCES.find((p) => p.name === state.province) || PROVINCES[0];
  const rank = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((p) => p.name === selected.name) + 1;
  const density = Math.round((selected.pop * 1e6) / selected.area);
  const share = ((selected.pop / 281.6) * 100).toFixed(2);
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10)
    .map((p) => ({ label: p.name, value: p.pop, note: "m", highlight: p.name === selected.name }));
  const options = [...PROVINCES].sort((a, b) => a.name.localeCompare(b.name))
    .map((p) => `<option value="${p.name}"${p.name === selected.name ? " selected" : ""}>${p.name}</option>`).join("");
  const dense = [...PROVINCES].sort((a, b) => (b.pop * 1e6) / b.area - (a.pop * 1e6) / a.area).slice(0, 8);
  return `
  <section class="pagehead">
    <p class="eyebrow">Provinces</p>
    <h1>38 provinces, one archipelago</h1>
    <p class="lede">Pick a province to see its people at a glance — population, density and its
    share of the country — then compare it with the biggest and the densest.</p>
    <label class="yearpick">Province
      <select id="provSelect" aria-label="Choose province">${options}</select>
    </label>
  </section>
  <div class="kpis">
    <article class="kpi"><h3>Province</h3><p class="big">${selected.name}</p><p class="sub">rank #${rank} of 38 by population</p><p class="tag">BPS 2024</p></article>
    <article class="kpi"><h3>Population</h3><p class="big">${fmt(selected.pop, 2)}m</p><p class="sub">${share}% of Indonesia</p><p class="tag">BPS 2024</p></article>
    <article class="kpi"><h3>Land area</h3><p class="big">${selected.area.toLocaleString("en-US")} km²</p><p class="sub">province land area</p><p class="tag">BPS 2024</p></article>
    <article class="kpi"><h3>Density</h3><p class="big">${density.toLocaleString("en-US")} /km²</p><p class="sub">${density > 1000 ? "among the densest in the country" : density > 200 ? "above the national 147 /km²" : "below the national 147 /km²"}</p><p class="tag">BPS 2024</p></article>
  </div>
  <div class="grid2">
    <section class="card">
      <h2>Ten largest provinces, 2024</h2>
      <p class="cardsub">Population in millions. Your selected province is highlighted in amber.</p>
      ${hbarChart(top10, { label: "Ten largest provinces 2024", unit: "m", decimals: 2 })}
      ${sourceLine("BPS mid-year provincial estimates, 2024.")}
    </section>
    <section class="card">
      <h2>Densest provinces, 2024</h2>
      <p class="cardsub">People per km². Jakarta's density is in a league of its own — more than
      fifteen thousand people per square kilometre.</p>
      <table class="data">
        <thead><tr><th>#</th><th>Province</th><th>Density (per km²)</th></tr></thead>
        <tbody>${dense.map((p, i) => `<tr><td>${i + 1}</td><td>${p.name}</td><td>${Math.round((p.pop * 1e6) / p.area).toLocaleString("en-US")}</td></tr>`).join("")}</tbody>
      </table>
      ${sourceLine("BPS 2024; density = population ÷ land area.")}
    </section>
  </div>`;
}

export function viewData(state) {
  const q = (state.q || "").toLowerCase();
  const rows = q
    ? INDICATORS.filter((r) => (r.name + " " + r.value + " " + r.source).toLowerCase().includes(q))
    : INDICATORS;
  return `
  <section class="pagehead">
    <p class="eyebrow">Data &amp; methods</p>
    <h1>Every indicator in one place</h1>
    <p class="lede">The full list behind this site: 25 indicators, each with its value, reference
    year and source. Search to filter; click a heading to sort.</p>
  </section>
  <section class="card">
    <label class="search">Search indicators
      <input id="indSearch" type="search" placeholder="e.g. poverty, GDP, literacy" value="${state.q || ""}" aria-label="Search indicators">
    </label>
    <table class="data" id="indTable">
      <thead><tr><th data-sort="name">Indicator</th><th data-sort="value">Value</th><th data-sort="year">Year</th><th>Source</th></tr></thead>
      <tbody>${rows.map((r) => `<tr><td>${r.name}</td><td>${r.value}</td><td>${r.year}</td><td>${r.source}</td></tr>`).join("")}</tbody>
    </table>
    <p class="hint">${rows.length} of ${INDICATORS.length} indicators shown.</p>
  </section>
  <div class="grid2">
    <section class="card">
      <h2>Sources</h2>
      <ul class="sourcelist">
        <li><b>BPS — Statistics Indonesia.</b> National accounts, population projections, Labour Force Survey, consumer prices, poverty and trade statistics. Figures as published for the year shown; survey months are named where they matter (unemployment: August/February; poverty: March/September).</li>
        <li><b>SSGI — Indonesian Nutrition Status Survey.</b> Stunting prevalence for children under five, Ministry of Health, 2024.</li>
        <li><b>Provincial estimates.</b> BPS mid-year 2024 estimates for all 38 provinces; density is population divided by land area.</li>
      </ul>
    </section>
    <section class="card">
      <h2>Methods &amp; notes</h2>
      <ul class="sourcelist">
        <li>GDP growth is the change in constant-price (real) GDP; nominal GDP is at current prices. GDP per capita in US dollars uses each year's average exchange rate.</li>
        <li>Inflation is the December year-on-year change in the consumer price index.</li>
        <li>Poverty uses the national poverty line: the cost of a minimum food basket plus essential non-food needs. The March 2025 rate (8.47%) covers 24.06 million people.</li>
        <li>Population figures are mid-year estimates; the 2020 census counted 270.20 million people in September 2020.</li>
        <li>Figures are rounded for display; underlying values are kept to the precision BPS publishes.</li>
      </ul>
    </section>
  </div>
  <section class="card">
    <h2>About NusaStat</h2>
    <p>NusaStat is an independent statistics site about Indonesia, built to show what a
    national statistics site should feel like: sourced figures, honest dates, charts
    you can read at a glance, and tables you can sort and search. It is not affiliated
    with BPS or any government body. All content is original; figures are public
    statistics, cited to their publisher and year.</p>
    <p class="src">Last updated 26 November 2026 · All pages work offline — no network requests.</p>
  </section>`;
}
