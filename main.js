import "./style.css";
import { getLeadsList } from "./src/script/api/getLeads";
import { Table } from "./src/script/view/table";
import { Pagination } from "./src/script/view/pagination";
import { createLoader } from "./src/script/view/loader/loader";

async function render() {
  const root = document.querySelector("#app");
  let table = document.createElement("table");
  table.cellSpacing = 10;

  const loader = createLoader();

  const data = await getLeadsList(1, 5);

  table = new Table(table, data, 5).render();

  const countLeadsOnPage = [2, 5, 10];

  const paginationButtons = new Pagination(
    table,
    loader,
    countLeadsOnPage
  ).render();
  root.append(table, paginationButtons, loader);
}

render();
