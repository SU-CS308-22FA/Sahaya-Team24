import http from "../api/http-common";

class MatchDataService {
    create(data) {
        return http.post("/matches", data);
      }
    
      getAll() {
        return http.get("/matches");
      }

      delete(id) {
        return http.delete(`/matches/${id}`);
      }
      update(id, data) {
        return http.put(`/players/${id}`, data);
      }
}

export default new MatchDataService();