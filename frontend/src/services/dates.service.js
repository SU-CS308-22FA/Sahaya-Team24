import http from "../api/http-common";

class DatesDataService {
  create(data) {
    return http.post("/dates", data);
  }
}

export default new DatesDataService();
