import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  constructor(public _service: ApiService) {}

  searchItem;
  itemsList: any = [];
  detailsList;
  totalCount;
  sortItem;
  hideme = [];
  index;
  loaderFlag: boolean;
  disabledFlag: boolean;
  p: number = 1;
  ngOnInit() {
    this.searchItem = "";
    this.sortItem = "";
    this.getUsers();
    if (this.itemsList.length == 0) {
      this.disabledFlag = true;
    } else {
      this.disabledFlag = false;
    }
  }
  getUsers() {
    this._service.getAPICall("users").subscribe(
      data => {
        this.itemsList = data;
      },
      error => {
        this._service.handleError(error);
      }
    );
  }
  serachUser(searchItem) {
    if (searchItem != "" && searchItem != null && searchItem != undefined) {
      this._service
        .getAPICall(
          "search/users?q=" + searchItem + "&page=" + 1 + "&per_page=5"
        )
        .subscribe(
          data => {
            this.totalCount = data["total_count"];
            this.itemsList = data["items"];
          },
          error => {
            this._service.handleError(error);
          }
        );
    }
  }

  getDetails(username, index) {
    this.index = index;
    this.detailsList = [];
    this.loaderFlag = true;
    this._service.getAPICall("users/" + username + "/repos").subscribe(
      data => {
        this.detailsList = data;
        this.loaderFlag = false;
      },
      error => {
        this._service.handleError(error);
      }
    );
  }

  sortList(e) {
    if (this.sortItem == "1") {
      this.itemsList.sort(function(a, b) {
        if (a.login < b.login) {
          return -1;
        }
        if (a.login > b.login) {
          return 1;
        }
        return 0;
      });
    } else if (this.sortItem == "2") {
      this.itemsList.sort(function(a, b) {
        if (a.login > b.login) {
          return -1;
        }
        if (a.login < b.login) {
          return 1;
        }
        return 0;
      });
    } else if (this.sortItem == "3") {
      this.itemsList.sort(function(a, b) {
        if (a.score > b.score) {
          return -1;
        }
        if (a.score < b.score) {
          return 1;
        }
        return 0;
      });
    } else if (this.sortItem == "4") {
      this.itemsList.sort(function(a, b) {
        if (a.score < b.score) {
          return -1;
        }
        if (a.score > b.score) {
          return 1;
        }
        return 0;
      });
    }
  }

  paginateIt(e) {
    if (e) {
      this.hideme[this.index] = false;
      this.detailsList = [];
    }
    let apiUrl: any;
    if (this.searchItem) {
      apiUrl =
        "search/users?q=" + this.searchItem + "&page=" + e + "&per_page=5";
    } else {
      apiUrl = "users?&page=" + e;
    }
    this._service.getAPICall(apiUrl).subscribe(
      data => {
        if (this.searchItem) {
          this.totalCount = data["total_count"];
          this.itemsList = data["items"];
        } else {
          this.itemsList = data;
        }
      },
      error => {
        this._service.handleError(error);
      }
    );
    console.log(e);
  }
}
