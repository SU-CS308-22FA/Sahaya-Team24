import http from "../api/http-common";

class DatesDataService {
  create(data) {
    return http.post("/dates", data);
  }

  getAll() {
    return http.get("/dates");
  }

  delete(date) {
    return http.delete(`/dates/${date}`);
  }
}

export default new DatesDataService();
