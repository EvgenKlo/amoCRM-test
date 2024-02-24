import "./toolbar.css";
import { getLeadsList } from "../../api/getLeads";

export class Toolbar {
  constructor(table, loader) {
    this.table = table;
    this.loader = loader;
    this.countLeadsOnPage = [2, 5, 10];
    this.limit = 5;
    this.number = 1;
    this.pageNumber;
    this.countButtonContainer;
    this.allLeads;
    this.prevPageBtn;
    this.nextPageBtn;

    this.sortBtnContainer;
    this.sortButtonsName = [
      "Сортировать по названию сделки",
      "Сортировать по бюджету",
    ];
    this.container;
    this.sortButtons = [];
    this.sortData;
    this.isSort;
  }

  render() {
    this.container = document.createElement("div");

    this.pageNumber = document.createElement("p");
    this.pageNumber.style.display = "inline-block";
    this.pageNumber.innerHTML = this.number;

    this.countButtonContainer = document.createElement("div");
    this.countLeadsOnPage.map((item) => {
      const button = document.createElement("button");
      button.innerHTML = item;
      button.onclick = async () => {
        try {
          await this.handlePressPagination(1, item);
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
        await this.handlePressPagination(1, 5);
      } catch (error) {
        console.log(error);
      }
    };

    this.prevPageBtn = document.createElement("button");
    this.prevPageBtn.innerHTML = "<<";
    this.prevPageBtn.disabled = true;
    this.prevPageBtn.onclick = async () => {
      try {
        await this.handlePressPagination(this.number - 1, this.limit);
      } catch (error) {
        console.log(error);
      }
    };

    this.nextPageBtn = document.createElement("button");
    this.nextPageBtn.innerHTML = ">>";
    this.nextPageBtn.onclick = async () => {
      try {
        await this.handlePressPagination(this.number + 1, this.limit);
      } catch (error) {
        console.log(error);
      }
    };

    this.countButtonContainer.append(
      this.prevPageBtn,
      this.pageNumber,
      this.nextPageBtn
    );

    this.sortBtnContainer = document.createElement("div");

    this.sortButtonsName.map((item) => {
      const button = document.createElement("button");
      button.classList.add("sort-btn");
      button.innerHTML = item;
      this.sortButtons.push(button);
      button.onclick = async () => {
        if (button.classList.contains("active")) {
          this.isSort = false;
          await this.handlePressPagination(1, this.limit);
          button.classList.remove("active");
        } else {
          await this.handleSortBtn(item, button);
        }
      };
      this.sortBtnContainer.append(button);
    });

    this.container.append(this.countButtonContainer, this.sortBtnContainer);

    return this.container;
  }

  async handlePressPagination(pageNumber, limit) {
    this.loader.classList.add("active");
    if (this.isSort) {
      this.number = pageNumber;
      this.limit = limit;
      this.pageNumber.innerHTML = this.number;
      this.nextPrevBtnDisabler();
      this.table.render(this.sortData, this.limit, this.number, this.isSort);
    } else {
      try {
        const data = await getLeadsList(pageNumber, limit);
        this.number = pageNumber;
        this.limit = limit;
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
        this.table.render(data, this.limit, this.number, this.isSort);
      } catch (error) {
        console.log(error);
      }
    }
    this.loader.classList.remove("active");
  }

  async handleSortBtn(buttonName, button) {
    try {
      this.loader.classList.add("active");

      const data = await getLeadsList();

      this.number = 1;

      this.pageNumber.innerHTML = this.number;

      this.isSort = true;
      this.sortButtons.map((item) => item.classList.remove("active"));
      button.classList.add("active");

      if (buttonName === "Сортировать по названию сделки") {
        data._embedded.leads.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        this.sortData = data;

        this.table.render(this.sortData, this.limit, this.number, this.isSort);
      } else {
        data._embedded.leads.sort((a, b) => a.price - b.price);

        this.sortData = data;

        this.table.render(this.sortData, this.limit, this.number, this.isSort);
      }

      this.nextPrevBtnDisabler();
    } catch (error) {
      console.log(error);
    } finally {
      this.loader.classList.remove("active");
    }
  }

  nextPrevBtnDisabler() {
    if (this.number * this.limit - this.limit !== 0) {
      this.prevPageBtn.disabled = false;
    } else {
      this.prevPageBtn.disabled = true;
    }

    if (this.number * this.limit < this.sortData._embedded.leads.length) {
      this.nextPageBtn.disabled = false;
    } else {
      this.nextPageBtn.disabled = true;
    }
  }
}
