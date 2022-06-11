import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

let email = "admin@gmail.com";
let password = "123456";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      errorMsg: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault(); //stop default action
    let emailVal = event.target.elements.email.value;
    let passwordVal = event.target.elements.password.value;
    if (email === emailVal && password === passwordVal) {
      this.setState({
        isAuthenticated: true,
      });
      localStorage.setItem("isAuthenticated", "true");
    } else {
      this.setState({
        errorMsg: "Please enter valid credentials",
      });
    }
  };

  handleSignOut = ()=>{
    this.setState({
      isAuthenticated: false
    })
    localStorage.removeItem("isAuthenticated")
  }

  componentDidMount() {
    console.log("app is started");
    let auth = localStorage.getItem("isAuthenticated");
    this.setState({
      isAuthenticated: auth ? true : false,
    });
  }

  //request types

  //GET, POST, DELETE, PUT,

  render() {
    const { isAuthenticated, errorMsg } = this.state;
    return isAuthenticated ? (
      <Container>
        <h1>home page</h1>
        <Button onClick={this.handleSignOut}>Sign out</Button>
      </Container>
    ) : (
      <Container>
        <Col md="6">
          <Form className="mt-5" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="with a placeholder"
                type="email"
                invalid={errorMsg !== ""}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="password placeholder"
                type="password"
                invalid={errorMsg !== ""}
              />
              {errorMsg !== "" && <FormFeedback>{errorMsg}</FormFeedback>}
            </FormGroup>
            <Button>Sign in</Button>
          </Form>
        </Col>
      </Container>
    );
  }
}

export default App;
