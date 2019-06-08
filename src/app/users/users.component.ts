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
  itemsList = [];
  detailsList;
  totalCount;
  sortItem;
  hideme = [];
  disabledFlag: boolean;
  ngOnInit() {
    this.searchItem = "";
    this.sortItem = "";
    if (this.itemsList.length == 0) {
      this.disabledFlag = true;
    } else {
      this.disabledFlag = false;
    }
  }

  serachUser(searchItem) {
    if (searchItem != "" && searchItem != null && searchItem != undefined) {
      this._service.getAPICall("search/users?q=" + searchItem).subscribe(
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

  getDetails(username) {
    this.detailsList = [];
    this._service.getAPICall("users/" + username + "/repos").subscribe(
      data => {
        this.detailsList = data;
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
}
