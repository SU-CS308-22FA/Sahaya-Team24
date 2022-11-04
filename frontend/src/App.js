import "./App.css";
import PlayerDataService from "./services/player.service";
const App = () => {
  var data = {
    p_id: "test-id-1",
    p_name: "test-name-1",
    age: 23,
    pr: 0,
    fpr: 0,
    position_a: "S",
    position_b: "GK",
    p_location: "test-location",
  };
  PlayerDataService.create(data)
    .then((response) => {
      this.setState({
        p_id: response.data.id,
        p_name: response.data.name,
        age: response.data.age,
        position_a: response.data.positionA,
        position_b: response.data.positionB,
        p_location: response.data.location,
      });
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
  return <div className="App"></div>;
};

export default App;
