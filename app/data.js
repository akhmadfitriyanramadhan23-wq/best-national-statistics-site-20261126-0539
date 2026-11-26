// NusaStat data — Indonesia national statistics.
// Every figure carries its source and reference year. Sources: BPS (Statistics
// Indonesia) unless noted. Values are the published annual figures; where a
// series mixes survey months, the month is named in the label.
export const META = {
  country: "Indonesia",
  updated: "26 November 2026",
  currency: "IDR",
  sourcesNote:
    "Figures: BPS — Statistics Indonesia (National Socio-Economic Survey, " +
    "Labour Force Survey, Consumer Price Survey, national accounts, trade " +
    "statistics). Stunting: SSGI, Ministry of Health. Human Development Index: " +
    "BPS. GDP per capita in US dollars at the year's average exchange rate.",
};

export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];

// Annual headline series. Each row: { year, value }.
export const SERIES = {
  // Mid-year population, millions (BPS population projection).
  population: [
    { year: 2019, value: 266.91 },
    { year: 2020, value: 269.58 },
    { year: 2021, value: 272.68 },
    { year: 2022, value: 275.77 },
    { year: 2023, value: 278.69 },
    { year: 2024, value: 281.6 },
  ],
  // Real GDP growth, percent year-on-year (BPS national accounts).
  gdpGrowth: [
    { year: 2019, value: 5.02 },
    { year: 2020, value: -2.07 },
    { year: 2021, value: 3.7 },
    { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
  ],
  // GDP at current prices, trillion rupiah (BPS national accounts).
  gdpNominal: [
    { year: 2019, value: 15832.7 },
    { year: 2020, value: 15434.2 },
    { year: 2021, value: 16970.8 },
    { year: 2022, value: 19588.5 },
    { year: 2023, value: 20892.4 },
    { year: 2024, value: 22139.0 },
  ],
  // GDP per capita, US dollars (BPS).
  gdpPerCapitaUsd: [
    { year: 2019, value: 4135 },
    { year: 2020, value: 3870 },
    { year: 2021, value: 4350 },
    { year: 2022, value: 4784 },
    { year: 2023, value: 4919 },
    { year: 2024, value: 4960 },
  ],
  // Consumer price inflation, December year-on-year, percent (BPS).
  inflation: [
    { year: 2019, value: 2.72 },
    { year: 2020, value: 1.68 },
    { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 },
  ],
  // Open unemployment rate, August, percent (BPS Labour Force Survey).
  // 2025 point is the February survey.
  unemployment: [
    { year: 2019, value: 5.28 },
    { year: 2020, value: 7.07 },
    { year: 2021, value: 6.49 },
    { year: 2022, value: 5.86 },
    { year: 2023, value: 5.32 },
    { year: 2024, value: 4.91 },
  ],
  unemploymentFeb2025: 4.76,
  // Poverty rate, percent of population (BPS; March each year, 2019 shown Sep).
  poverty: [
    { year: 2019, value: 9.22, note: "Sep 2019" },
    { year: 2020, value: 10.19, note: "Sep 2020" },
    { year: 2021, value: 9.71, note: "Sep 2021" },
    { year: 2022, value: 9.57, note: "Sep 2022" },
    { year: 2023, value: 9.36, note: "Sep 2023" },
    { year: 2024, value: 8.57, note: "Sep 2024" },
  ],
  povertyMar2025: 8.47,
  // Exports / imports, billion US dollars (BPS trade statistics).
  exports: [
    { year: 2019, value: 167.7 },
    { year: 2020, value: 163.2 },
    { year: 2021, value: 231.6 },
    { year: 2022, value: 291.9 },
    { year: 2023, value: 258.8 },
    { year: 2024, value: 264.7 },
  ],
  imports: [
    { year: 2019, value: 171.3 },
    { year: 2020, value: 141.6 },
    { year: 2021, value: 196.2 },
    { year: 2022, value: 237.4 },
    { year: 2023, value: 221.9 },
    { year: 2024, value: 233.7 },
  ],
  // Human Development Index (BPS).
  hdi: [
    { year: 2019, value: 71.92 },
    { year: 2020, value: 71.94 },
    { year: 2021, value: 72.77 },
    { year: 2022, value: 73.78 },
    { year: 2023, value: 74.39 },
    { year: 2024, value: 75.02 },
  ],
  // Life expectancy at birth, years (BPS).
  lifeExpectancy: [
    { year: 2019, value: 71.2 },
    { year: 2020, value: 71.47 },
    { year: 2021, value: 71.75 },
    { year: 2022, value: 73.63 },
    { year: 2023, value: 73.93 },
    { year: 2024, value: 74.12 },
  ],
  // Mean years of schooling, years (BPS).
  meanSchooling: [
    { year: 2019, value: 8.34 },
    { year: 2020, value: 8.48 },
    { year: 2021, value: 8.56 },
    { year: 2022, value: 8.69 },
    { year: 2023, value: 8.77 },
    { year: 2024, value: 9.05 },
  ],
};

// Latest headline indicators shown on the overview page.
export const HEADLINE = [
  { label: "Population", value: "281.6m", sub: "mid-2024 · +1.0% a year", source: "BPS 2024" },
  { label: "GDP growth", value: "5.03%", sub: "2024, year-on-year", source: "BPS 2024" },
  { label: "GDP", value: "Rp 22,139tn", sub: "current prices, 2024", source: "BPS 2024" },
  { label: "Inflation", value: "1.57%", sub: "Dec 2024, year-on-year", source: "BPS 2024" },
  { label: "Unemployment", value: "4.76%", sub: "Feb 2025 survey", source: "BPS 2025" },
  { label: "Poverty rate", value: "8.47%", sub: "Mar 2025 · 24.06m people", source: "BPS 2025" },
];

// Age structure, 2024 (BPS): share of population by broad age group.
export const AGE_STRUCTURE = [
  { group: "0–14 years", share: 24.1, people: "67.9m" },
  { group: "15–64 years", share: 68.8, people: "193.8m" },
  { group: "65+ years", share: 7.1, people: "20.0m" },
];

// Provinces, 2024 mid-year estimates (BPS). Population in millions, area in km2.
// The 38 provinces as of 2024; South Papua, Central Papua, Highland Papua and
// Southwest Papua are shown with their 2024 estimates.
export const PROVINCES = [
  { name: "West Java", pop: 49.94, area: 35378 },
  { name: "East Java", pop: 41.81, area: 47803 },
  { name: "Central Java", pop: 37.89, area: 32801 },
  { name: "North Sumatra", pop: 15.59, area: 72981 },
  { name: "Banten", pop: 12.43, area: 9663 },
  { name: "Jakarta", pop: 10.56, area: 661 },
  { name: "South Sulawesi", pop: 9.36, area: 46717 },
  { name: "Lampung", pop: 9.32, area: 34624 },
  { name: "South Sumatra", pop: 8.84, area: 91592 },
  { name: "Riau", pop: 6.82, area: 87024 },
  { name: "West Sumatra", pop: 5.76, area: 42013 },
  { name: "Nusa Tenggara Timur", pop: 5.72, area: 47932 },
  { name: "West Kalimantan", pop: 5.65, area: 147307 },
  { name: "West Nusa Tenggara", pop: 5.65, area: 18572 },
  { name: "Aceh", pop: 5.55, area: 57956 },
  { name: "Bali", pop: 4.35, area: 5780 },
  { name: "South Kalimantan", pop: 4.33, area: 38744 },
  { name: "East Kalimantan", pop: 4.01, area: 127347 },
  { name: "Yogyakarta", pop: 3.72, area: 3133 },
  { name: "Jambi", pop: 3.64, area: 50058 },
  { name: "Papua", pop: 1.58, area: 81049 },
  { name: "Central Sulawesi", pop: 3.1, area: 61841 },
  { name: "Southeast Sulawesi", pop: 2.83, area: 38068 },
  { name: "North Sulawesi", pop: 2.72, area: 13852 },
  { name: "West Papua", pop: 1.2, area: 60422 },
  { name: "Central Papua", pop: 1.35, area: 61377 },
  { name: "South Papua", pop: 0.54, area: 117849 },
  { name: "Highland Papua", pop: 1.4, area: 51214 },
  { name: "Southwest Papua", pop: 0.62, area: 39067 },
  { name: "Bengkulu", pop: 2.06, area: 19935 },
  { name: "West Sulawesi", pop: 1.54, area: 16787 },
  { name: "North Maluku", pop: 1.41, area: 31983 },
  { name: "Maluku", pop: 1.98, area: 46914 },
  { name: "Gorontalo", pop: 1.25, area: 11258 },
  { name: "North Kalimantan", pop: 0.73, area: 70183 },
  { name: "Bangka Belitung", pop: 1.5, area: 16424 },
  { name: "Riau Islands", pop: 2.13, area: 8201 },
  { name: "Central Kalimantan", pop: 2.81, area: 153564 },
];

// Health and education snapshot, 2024 (BPS unless noted).
export const WELLBEING = [
  { label: "Life expectancy", value: "74.1 years", source: "BPS 2024" },
  { label: "Human Development Index", value: "75.02", source: "BPS 2024" },
  { label: "Mean years of schooling", value: "9.05 years", source: "BPS 2024" },
  { label: "Expected years of schooling", value: "13.2 years", source: "BPS 2024" },
  { label: "Adult literacy (15+)", value: "96.0%", source: "BPS 2024" },
  { label: "Stunting, under-5s", value: "19.8%", source: "SSGI 2024" },
  { label: "Infant mortality", value: "16.7 per 1,000", source: "BPS 2024" },
  { label: "Urban population", value: "58.6%", source: "BPS 2024" },
];

// Latest releases, by reference period (BPS release calendar).
export const RELEASES = [
  { date: "Mar 2025", title: "Poverty falls to 8.47% — 24.06 million people below the line", tag: "Poverty" },
  { date: "Feb 2025", title: "Open unemployment 4.76%, the lowest since the pandemic", tag: "Labour" },
  { date: "2024", title: "Economy grows 5.03%; GDP reaches Rp 22,139 trillion", tag: "GDP" },
  { date: "Dec 2024", title: "Inflation ends 2024 at 1.57% year-on-year", tag: "Prices" },
  { date: "2024", title: "Exports US$ 264.7bn, imports US$ 233.7bn — surplus US$ 31.0bn", tag: "Trade" },
  { date: "2024", title: "Human Development Index rises to 75.02", tag: "People" },
];

// Full indicator dictionary for the Data page: one row per indicator.
export const INDICATORS = [
  { name: "Population (mid-year)", value: "281.60 million", year: 2024, unit: "people", source: "BPS" },
  { name: "Population growth", value: "1.04%", year: 2024, unit: "per year", source: "BPS" },
  { name: "Population density", value: "147 per km²", year: 2024, unit: "people/km²", source: "BPS" },
  { name: "GDP, current prices", value: "Rp 22,139.0 trillion", year: 2024, unit: "rupiah", source: "BPS" },
  { name: "GDP growth (real)", value: "5.03%", year: 2024, unit: "percent", source: "BPS" },
  { name: "GDP per capita", value: "US$ 4,960", year: 2024, unit: "US dollars", source: "BPS" },
  { name: "GDP per capita", value: "Rp 78.62 million", year: 2024, unit: "rupiah", source: "BPS" },
  { name: "Inflation (Dec, y-on-y)", value: "1.57%", year: 2024, unit: "percent", source: "BPS" },
  { name: "Unemployment (open rate)", value: "4.76%", year: "Feb 2025", unit: "percent", source: "BPS" },
  { name: "Poverty rate", value: "8.47%", year: "Mar 2025", unit: "percent", source: "BPS" },
  { name: "Poor population", value: "24.06 million", year: "Mar 2025", unit: "people", source: "BPS" },
  { name: "Exports (f.o.b.)", value: "US$ 264.70 billion", year: 2024, unit: "US dollars", source: "BPS" },
  { name: "Imports (c.i.f.)", value: "US$ 233.66 billion", year: 2024, unit: "US dollars", source: "BPS" },
  { name: "Trade balance", value: "US$ 31.04 billion", year: 2024, unit: "US dollars", source: "BPS" },
  { name: "Life expectancy at birth", value: "74.12 years", year: 2024, unit: "years", source: "BPS" },
  { name: "Human Development Index", value: "75.02", year: 2024, unit: "index 0–100", source: "BPS" },
  { name: "Mean years of schooling", value: "9.05 years", year: 2024, unit: "years", source: "BPS" },
  { name: "Expected years of schooling", value: "13.21 years", year: 2024, unit: "years", source: "BPS" },
  { name: "Adult literacy rate (15+)", value: "96.04%", year: 2024, unit: "percent", source: "BPS" },
  { name: "Stunting prevalence (under-5)", value: "19.8%", year: 2024, unit: "percent", source: "SSGI" },
  { name: "Infant mortality rate", value: "16.7 per 1,000 live births", year: 2024, unit: "per 1,000", source: "BPS" },
  { name: "Urban population share", value: "58.6%", year: 2024, unit: "percent", source: "BPS" },
  { name: "Working-age share (15–64)", value: "68.8%", year: 2024, unit: "percent", source: "BPS" },
  { name: "Number of provinces", value: "38", year: 2024, unit: "provinces", source: "BPS" },
  { name: "Number of regencies/cities", value: "514", year: 2024, unit: "areas", source: "BPS" },
];

export function seriesValue(series, year) {
  const row = SERIES[series].find((r) => r.year === year);
  return row ? row.value : null;
}

export function tradeBalance(year) {
  const ex = SERIES.exports.find((r) => r.year === year);
  const im = SERIES.imports.find((r) => r.year === year);
  if (!ex || !im) return null;
  return +(ex.value - im.value).toFixed(1);
}
