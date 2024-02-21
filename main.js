import "./style.css";
import { getLeadsList } from "./src/script/api/api";
import { renderTable } from "./src/script/view/renderTable";
import { pagination } from "./src/script/view/pagination";

async function render() {
  const root = document.querySelector("#app");
  const table = document.createElement("table");
  table.cellSpacing = 10;

  const data = await getLeadsList(1, 5);
  renderTable(table, data);
  const paginationButtons = pagination(table);
  root.append(table, paginationButtons);
}

render();
