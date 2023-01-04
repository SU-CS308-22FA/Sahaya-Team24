import http from "../api/http-common";

class RefereeDataService {
  getAll() {
    return http.get("/referees");
  }

  get(id) {
    return http.get(`/referees/${id}`);
  }

  create(data) {
    return http.post("/referees", data);
  }

  update(id, data) {
    return http.put(`/referees/${id}`, data);
  }

  delete(id) {
    return http.delete(`/referees/${id}`);
  }

  deleteAll() {
    return http.delete(`/referees`);
  }

  addMatchToReferee(rid, mid) {
    return http.put(`/referees/${rid}/${mid}`)
  }
  
  deleteMatchFromReferee(rid, mid) {
    return http.delete(`/referees/${rid}/${mid}`)
  }

  notify(id, data) {
    return http.put(`/referees/notify/${id}`, data)
  }

  deleteNotification(rid, nid) {
    return http.delete(`/referees/notify/${rid}/${nid}`)
  }
}

export default new RefereeDataService();
