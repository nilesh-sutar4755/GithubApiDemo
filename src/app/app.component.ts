import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "githubApiDemo";
  scrollTOP;
  ngOnInit() {
    window.addEventListener("scroll", this.scroll, true);
  }

  // Scroll to top

  scroll = (): void => {
    this.scrollTOP =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (this.scrollTOP > 20) {
      document.getElementById("gotoTop").style.display = "block";
    } else {
      document.getElementById("gotoTop").style.display = "none";
    }
  };

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
}
