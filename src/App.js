import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DetailHome from "./routes/DetailHome.js";
import DetailDetail from "./routes/DetailDetail.js";

function App() {
  return (
  <Router>
    <Switch>
      <Route path="/page/:id">
        <DetailDetail />
      </Route>
      <Route path="/">
        <DetailHome />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;