import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import MainSection from "./Home/MainSection";
import LatestResults from "./Home/LatestResults";
import HowItWorks from "./Home/HowItWorks";
import CategorIesProject from "./Home/CategorIesProject";
import LatestProject from "./Home/LatestProject";
import CallToAction from "./Home/CallToAction";

const Home = ({ contract }) => {
  const [projects1, setProjects1] = useState([]);

  useEffect(() => {
    // every second after the component first mounts
    // update the list of projects by invoking the listOfProjects
    // method on the smart contract
    const id = setInterval(() => {
      contract.listOfProjects().then((projects) => {
        console.log("projects", projects);
        let size = 3;
        let newArr = projects.slice(0, size);
        console.log("newArr", newArr);
        setProjects1(newArr);
      });
    }, 3000);
    return () => clearInterval(id);
  }, [contract]);

  return (
    <>
      <Container>
        <MainSection />
        <LatestResults contract={contract} />
        <HowItWorks />
        <CategorIesProject />
        <LatestProject projects1={projects1} />
      </Container>
      <CallToAction />
    </>
  );
};
export default Home;
