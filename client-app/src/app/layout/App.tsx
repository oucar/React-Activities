import { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        {/* <ActivityDashboard /> */}
        {/* Similar to Angular */}
        <Outlet />
      </Container>
    </Fragment>
  );
}

// observer is a higher order component that wraps the App component
// and makes it an observer of the MobX store
// also, MobX doesn't support fast refresh
export default observer(App);
