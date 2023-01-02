import http from "../api/http-common";

class PlayerDataService {
  getAll() {
    return http.get("/players");
  }

  get(id) {
    return http.get(`/players/${id}`);
  }

  create(data) {
    return http.post("/players", data);
  }

  update(id, data) {
    return http.put(`/players/${id}`, data);
  }

  delete(id) {
    return http.delete(`/players/${id}`);
  }

  deleteAll() {
    return http.delete(`/players`);
  }

  findByTitle(title) {
    return http.get(`/players?title=${title}`);
  }

  notify(id, data) {
    return http.put(`/players/notify/${id}`, data)
  }

  deleteNotification(pid,nid) {
    return http.delete(`/players/${pid}/${nid}`)
  }

  addMatchToPlayer(pid,mid) {
    return http.put(`/players/${pid}/${mid}`)
  }
}

export default new PlayerDataService();
