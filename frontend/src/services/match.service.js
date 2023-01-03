import http from "../api/http-common";

class MatchDataService {
    create(data) {
        return http.post("/matches", data);
      }
    
      getAll() {
        return http.get("/matches");
      }

      get(id) {
        return http.get(`/matches/${id}`)
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
      deletePlayerFromMatch(mid,pid){
        return http.delete(`/matches/${mid}/${pid}`)
      }


      addPlayerToWaiting(mid,pid) {
        return http.put(`/matches/waiting/${mid}/${pid}`)
      }
      deletePlayerFromWaiting(mid,pid) {
        return http.delete(`/matches/waiting/${mid}/${pid}`)
      }
}

export default new MatchDataService();