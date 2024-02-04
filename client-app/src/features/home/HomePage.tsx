import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";

export default observer(function HomePage() {
  // after adding the store - always make sure to add the store to the observer!!
  const { userStore, modalStore } = useStore();

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button as={Link} to="/login" size="huge" inverted>
              Login!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              to="/login"
              size="huge"
              inverted
            >
              Login!
            </Button>
            <Button
              onClick={() => modalStore.openModal(<h1>Register</h1>)}
              to="/login"
              size="huge"
              inverted
            >
              Register!
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});
