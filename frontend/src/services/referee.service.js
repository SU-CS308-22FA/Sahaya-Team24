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
}

export default new RefereeDataService();