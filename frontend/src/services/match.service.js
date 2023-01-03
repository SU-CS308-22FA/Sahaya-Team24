import http from "../api/http-common";

class MatchDataService {
    create(data) {
        return http.post("/matches", data);
      }
    
      getAll() {
        return http.get("/matches");
      }
      getByid(id){
        return http.get(`/matches/${id}`);
      }

      delete(id) {
        return http.delete(`/matches/${id}`);
      }
      update(id, data) {
        return http.put(`/matches/${id}`, data);
      }
      addPlayerToMatch(mid,pid) {
        return http.put(`/matches/${mid}/${pid}`)
      }
}

export default new MatchDataService();