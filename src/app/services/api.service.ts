import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  public apiUrl = environment.apiUrl;
  httpHeaders;
  options;

  constructor(private httpClient: HttpClient) {}

  getAPICall(apiUrl) {
    this.httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.options = {
      headers: this.httpHeaders
    };
    return this.httpClient.get(this.apiUrl + apiUrl, this.options);
  }

  postAPICall(apiUrl, jsonBody) {
    this.httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.options = {
      headers: this.httpHeaders
    };

    return this.httpClient.post(
      this.apiUrl + apiUrl,
      { body: jsonBody },
      this.options
    );
  }

  handleError(error) {
    alert(error.error.message);
    console.log(error);
  }
}
