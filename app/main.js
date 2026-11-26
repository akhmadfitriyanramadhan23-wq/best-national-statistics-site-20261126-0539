// main.js — router and controls for NusaStat. Hash routes: #/ #/economy
// #/people #/regions #/data. All state lives in `state`; every control that
// changes it re-renders its page, and table search/sort work in place.
import { viewOverview, viewEconomy, viewPeople, viewRegions, viewData } from "./views.js";

const state = { year: 2024, province: "West Java", q: "" };
const mount = document.getElementById("view");
const navLinks = [...document.querySelectorAll(".topnav a")];

const ROUTES = {
  "": viewOverview,
  "/": viewOverview,
  "/economy": () => viewEconomy(state),
  "/people": () => viewPeople(state),
  "/regions": () => viewRegions(state),
  "/data": () => viewData(state),
};

function currentRoute() {
  const hash = location.hash.replace(/^#/, "") || "/";
  return ROUTES[hash] ? hash : "/";
}

function render() {
  const route = currentRoute();
  mount.innerHTML = ROUTES[route]();
  navLinks.forEach((a) => {
    const href = a.getAttribute("href").replace(/^#/, "") || "/";
    a.classList.toggle("active", href === route);
    if (href === route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  wireControls(route);
  window.scrollTo(0, 0);
}

function wireControls(route) {
  // Year picker on the Economy page: re-render with the chosen year.
  const yearSelect = document.getElementById("yearSelect");
  if (yearSelect) {
    yearSelect.addEventListener("change", () => {
      state.year = Number(yearSelect.value);
      render();
    });
  }
  // Province picker on the Regions page.
  const provSelect = document.getElementById("provSelect");
  if (provSelect) {
    provSelect.addEventListener("change", () => {
      state.province = provSelect.value;
      render();
    });
  }
  // Live search boxes: filter the page's table rows in place, keep focus.
  for (const [inputId, tableId, countId] of [
    ["provSearch", "provTable", "provCount"],
    ["indSearch", "indTable", null],
  ]) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    if (!input || !table) continue;
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      state.q = input.value;
      let shown = 0;
      for (const row of table.tBodies[0].rows) {
        const hit = !q || row.textContent.toLowerCase().includes(q);
        row.style.display = hit ? "" : "none";
        if (hit) shown += 1;
      }
      if (countId) {
        const el = document.getElementById(countId);
        const total = table.tBodies[0].rows.length;
        if (el) el.textContent = `${shown} of ${total} provinces shown.`;
      }
    });
  }
  // Click-to-sort on any table with th[data-sort].
  for (const table of document.querySelectorAll("table.data")) {
    const heads = [...table.querySelectorAll("th[data-sort]")];
    heads.forEach((th) => {
      th.addEventListener("click", () => {
        const idx = [...th.parentElement.children].indexOf(th);
        const asc = th.dataset.dir !== "asc";
        heads.forEach((h) => delete h.dataset.dir);
        th.dataset.dir = asc ? "asc" : "desc";
        const rows = [...table.tBodies[0].rows];
        rows.sort((a, b) => {
          const ca = a.cells[idx];
          const cb = b.cells[idx];
          const na = ca.dataset.num !== undefined ? Number(ca.dataset.num) : null;
          const nb = cb.dataset.num !== undefined ? Number(cb.dataset.num) : null;
          let cmp;
          if (na !== null && nb !== null) cmp = na - nb;
          else cmp = ca.textContent.trim().localeCompare(cb.textContent.trim());
          return asc ? cmp : -cmp;
        });
        for (const row of rows) table.tBodies[0].appendChild(row);
      });
    });
  }
}

window.addEventListener("hashchange", render);
render();
