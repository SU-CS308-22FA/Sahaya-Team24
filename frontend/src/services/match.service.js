import http from "../api/http-common";

class MatchDataService {
    create(data) {
        return http.post("/matches", data);
      }


}