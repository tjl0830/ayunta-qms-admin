import React from "react";
import UpperNavBar from "../../components/UpperNavBar/UpperNavBar";
import AdminFunctions from "../../components/AdminFunctions/AdminFunctions";
import CurrentlyServing from "../../components/CurrentlyServing/CurrentlyServing";
import NextServing from "../../components/NextServing/NextServing";
import Excel from "../../assets/Excel.png";
import Styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={Styles.Container}>
      <UpperNavBar />
      <div className={Styles.LeftContainer}>
        <AdminFunctions />
        <CurrentlyServing />
        <NextServing />
      </div>
      <div className={Styles.RightContainer}>
        <img className={Styles.Excel} src={Excel} alt="Excel Frame" />
      </div>
    </div>
  );
};

export default Home;
