import "./style.css";
import { getLeadsList } from "./src/script/api/getLeads";
import { Toolbar } from "./src/script/view/pagination/Toolbar";
import { createLoader } from "./src/script/view/loader/loader";
import { Table } from "./src/script/view/table/Table";

async function renderApp() {
  const root = document.querySelector("#app");

  const loader = createLoader();

  const data = await getLeadsList(1, 5);

  const table = new Table();

  table.render(data, 5, 1, false);

  const toolbar = new Toolbar(table, loader).render();

  root.append(table.table, toolbar, loader);
}

renderApp();
