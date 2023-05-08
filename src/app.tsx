import "./app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Activity from "./pages/Activity/Activity";
import Membership from "./pages/Membership/Memebership";
import { ProvideAuth } from "./hooks/useAuth";
import Auth from "./pages/Auth/Auth";

export function App() {
  return (
    <ProvideAuth>
      <Router basename="webapp">
        <Routes>
          <Route path="/" element={<Navigate to={"hyderabad"} />} />
          <Route path=":location">
            <Route path="" element={<Home />} />
            <Route path=":activity" element={<Activity />} />
          </Route>
          <Route path="membership" element={<Membership/>} ></Route>
          <Route path="auth" element={<Auth />} />
        </Routes>
      </Router>
    </ProvideAuth>
  );
}
