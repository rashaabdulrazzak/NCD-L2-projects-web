import 'regenerator-runtime/runtime';
import React from 'react';
import PropTypes from 'prop-types';
import { Row,Button ,Container, Col} from 'react-bootstrap';

import CreateProject from './components/CreateProject';
import ProjectList from './components/ProjectList';
import Balance from "./components/Balance";

const App = ({ contract, currentUser, nearConfig, wallet }) => {

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'dev-1637159318973-57576165741839'
    );
  };
  
  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  return (
    <>
    <Container>   
      <h1 className="p-5"style={{color: 'teal',textAlign:'center'}}> <i class="bi bi-emoji-heart-eyes"></i>	Let's Support Each Other <i class="bi bi-emoji-heart-eyes"></i>	</h1>
     
      { currentUser
        ? <Container>
            <Row>
              <h2>
                Hello: {currentUser.accountId} :{ currentUser ? <Balance amount={currentUser.balance} /> : null}
                {" "}
                <Button variant="secondary" onClick={signOut}>Log out</Button>
              </h2>   
            </Row>                       
            <Row>
              <Col lg="4">
                <CreateProject contract={contract} />
              </Col>
              <Col lg="8">
                <ProjectList contract={contract} wallet={wallet} />
              </Col>
            </Row>              
          </Container>
        : 
        <Row>
          Sign In To Use The App: 
          {" "}
          <button onClick={signIn}>Log in</button>
        </Row>
      } 
    </Container>
    </>    
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    listOfProjects: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,      
    updateFund:PropTypes.func.isRequired     
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
