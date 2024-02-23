import { getLeadsList } from "../api/getLeads";
import { renderTable } from "./table";

export class Pagination {
  constructor(table, loader, countLeadsOnPage) {
    this.table = table;
    this.loader = loader;
    this.countLeadsOnPage = countLeadsOnPage;
    this.limit = 5;
    this.number = 1;
    this.pageNumber;
    this.countButtonContainer;
    this.allLeads;
    this.prevPageBtn;
    this.nextPageBtn;
  }

  render() {
    this.pageNumber = document.createElement("p");
    this.pageNumber.style.display = "inline-block";
    this.pageNumber.innerHTML = this.number;

    this.countButtonContainer = document.createElement("div");
    this.countLeadsOnPage.map((item) => {
      const button = document.createElement("button");
      button.innerHTML = item;
      button.onclick = async () => {
        try {
          this.limit = item;
          this.number = 1;
          await this.handlePressBtn();
        } catch (error) {
          console.log(error);
        }
      };
      this.countButtonContainer.append(button);
    });

    this.allLeads = document.createElement("button");
    this.allLeads.innerHTML = "Все сделки";
    this.countButtonContainer.append(this.allLeads);
    this.allLeads.onclick = async () => {
      try {
        this.limit = 5;
        this.number = 1;
        await this.handlePressBtn();
      } catch (error) {
        console.log(error);
      }
    };

    this.prevPageBtn = document.createElement("button");
    this.prevPageBtn.innerHTML = "<<";
    this.prevPageBtn.disabled = true;
    this.prevPageBtn.onclick = async () => {
      try {
        this.number--;
        await this.handlePressBtn();
      } catch (error) {
        console.log(error);
      }
    };

    this.nextPageBtn = document.createElement("button");
    this.nextPageBtn.innerHTML = ">>";
    this.nextPageBtn.onclick = async () => {
      try {
        this.number++;
        await this.handlePressBtn();
      } catch (error) {
        console.log(error);
      }
    };

    this.countButtonContainer.append(
      this.prevPageBtn,
      this.pageNumber,
      this.nextPageBtn
    );

    return this.countButtonContainer;
  }

  async handlePressBtn() {
    this.loader.classList.add("active");
    const data = await getLeadsList(this.number, this.limit);
    this.loader.classList.remove("active");
    this.pageNumber.innerHTML = this.number;
    if (data._links.prev) {
      this.prevPageBtn.disabled = false;
    } else {
      this.prevPageBtn.disabled = true;
    }
    if (data._links.next) {
      this.nextPageBtn.disabled = false;
    } else {
      this.nextPageBtn.disabled = true;
    }
    renderTable(this.table, data, this.limit);
  }
}
