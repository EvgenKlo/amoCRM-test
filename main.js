import "./style.css";
import { getLeadsList } from "./src/script/api/getLeads";
import { renderTable } from "./src/script/view/renderTable";
import { Pagination } from "./src/script/view/pagination";
import { createLoader } from "./src/script/view/loader/loader";

async function render() {
  const root = document.querySelector("#app");
  const table = document.createElement("table");
  table.cellSpacing = 10;

  const loader = createLoader();

  const data = await getLeadsList(1, 5);
  renderTable(table, data, 5);

  const paginationButtons = new Pagination(table, loader).render();
  root.append(table, paginationButtons, loader);
}

render();
