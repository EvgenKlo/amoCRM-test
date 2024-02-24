import "./table.css";

export class Table {
  constructor() {
    this.table = document.createElement("table");
    this.tableHeadTitle = [
      "№",
      "Название сделки",
      "Бюджет",
      "Дата создания",
      "Дата изменения",
    ];
  }

  render(data, limit, pageNumber) {
    this.table.innerHTML = "";

    const headRow = document.createElement("tr");
    this.tableHeadTitle.map((item) => {
      const headCeil = document.createElement("th");
      headCeil.innerHTML = item;
      headRow.append(headCeil);
    });
    this.table.append(headRow);

    data._embedded.leads.map((item, index) => {
      this.buildTable(item, index, limit, pageNumber);
    });

    return this.table;
  }

  renderSortTable(data, limit, pageNumber) {
    this.table.innerHTML = "";

    const headRow = document.createElement("tr");
    this.tableHeadTitle.map((item) => {
      const headCeil = document.createElement("th");
      headCeil.innerHTML = item;
      headRow.append(headCeil);
    });
    this.table.append(headRow);

    data._embedded.leads
      .filter((item, index) => {
        if (index >= pageNumber * limit - limit && index < pageNumber * limit) {
          return item;
        }
      })
      .map((item, index) => {
        this.buildTable(item, index, limit, pageNumber);
      });

    return this.table;
  }

  buildTable(item, index, limit, pageNumber) {
    const tableRow = document.createElement("tr");

    const numberRow = limit * pageNumber - limit + index + 1;
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
    this.table.append(tableRow);
  }
}
