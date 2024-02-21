import { getLeadsList } from "../api/api";
import { renderTable } from "./renderTable";

const countLeadsOnPage = [2, 5, 10];

export function pagination(table) {
  let limit = 5;
  let number = 1;

  const pageNumber = document.createElement("p");
  pageNumber.style.display = "inline-block";
  pageNumber.innerHTML = number;

  const countButtonContainer = document.createElement("div");
  countLeadsOnPage.map((item) => {
    const button = document.createElement("button");
    button.innerHTML = item;
    button.onclick = async () => {
      limit = item;
      number = 1;
      const data = await getLeadsList(number, item);
      renderTable(table, data);
      pageNumber.innerHTML = number;
    };
    countButtonContainer.append(button);
  });
  const allLeads = document.createElement("button");
  allLeads.innerHTML = "Все сделки";
  countButtonContainer.append(allLeads);
  allLeads.onclick = async () => {
    const data = await getLeadsList(2, 5);
    renderTable(table, data);
  };

  const prevPageBtn = document.createElement("button");
  prevPageBtn.innerHTML = "<<";
  prevPageBtn.disabled = true;
  prevPageBtn.onclick = async () => {
    number--;
    pageNumber.innerHTML = number;
    if (number === 1) {
      prevPageBtn.disabled = true;
    } else {
      prevPageBtn.disabled = false;
    }
    const data = await getLeadsList(number, limit);
    renderTable(table, data);
  };
  countButtonContainer.append(prevPageBtn);

  countButtonContainer.append(pageNumber);

  const nextPageBtn = document.createElement("button");
  nextPageBtn.innerHTML = ">>";
  nextPageBtn.onclick = async () => {
    number++;
    pageNumber.innerHTML = number;
    if (number === 1) {
      prevPageBtn.disabled = true;
    } else {
      prevPageBtn.disabled = false;
    }
    const data = await getLeadsList(number, limit);
    renderTable(table, data);
  };
  countButtonContainer.append(nextPageBtn);

  return countButtonContainer;
}
