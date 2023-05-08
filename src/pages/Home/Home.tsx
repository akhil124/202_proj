import { useParams } from "react-router-dom";
import ActivityList from "../../components/ActivityList/ActivityList";
import Hero from "../../components/Hero/Hero";
import Header from "../../components/Header/Header";
import './Home.scss'

const Home = () => {
  const {location = "hyderabad"}  = useParams();
  return (
    <div className="home">
      <Header city={location}/>
      <Hero />
      <ActivityList city={location} />
    </div>
  );
};

export default Home;
