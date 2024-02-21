const tableHeadTitle = [
  "№",
  "Название сделки",
  "Бюджет",
  "Дата создания",
  "Дата изменения",
];

export function renderTable(table, data) {
  table.innerHTML = "";
  const headRow = document.createElement("tr");
  tableHeadTitle.map((item) => {
    const headCeil = document.createElement("th");
    headCeil.innerHTML = item;
    headRow.append(headCeil);
  });
  table.append(headRow);
  data._embedded.leads.map((item, index) => {
    const tableRow = document.createElement("tr");

    const numberRow = index + 1;
    const numberCeil = document.createElement("td");
    numberCeil.innerHTML = numberRow;

    const nameLead = item.name;
    const nameCeil = document.createElement("td");
    nameCeil.innerHTML = nameLead;

    const budgetLead = item.price;
    const budgetCeil = document.createElement("td");
    budgetCeil.innerHTML = budgetLead;

    const dateCreatedLead = new Date(item.created_at * 1000).toLocaleString();
    const dateCreatedCeil = document.createElement("td");
    dateCreatedCeil.innerHTML = dateCreatedLead;

    const dateChangeLead = new Date(item.updated_at * 1000).toLocaleString();
    const dateChangeCeil = document.createElement("td");
    dateChangeCeil.innerHTML = dateChangeLead;

    tableRow.append(
      numberCeil,
      nameCeil,
      budgetCeil,
      dateCreatedCeil,
      dateChangeCeil
    );
    table.append(tableRow);
  });
  return table;
}
