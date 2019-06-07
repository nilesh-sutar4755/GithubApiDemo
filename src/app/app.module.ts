import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { UsersComponent } from "./users/users.component";
import { ApiService } from "./services/api.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, UsersComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
  exports: [UsersComponent]
})
export class AppModule {}
