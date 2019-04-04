import React, { PureComponent, ChangeEvent } from 'react';
import { Auth } from 'aws-amplify';
import { LoaderButton } from './LoaderButton';

interface State {
  email: string;
  password: string;
  isLoading: boolean;
}

interface Props {
  userHasAuthenticated: (isAuthenticated: boolean) => void;
  history: {
    push: (url: string) => void;
  };
}

export class Login extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    switch (event.target.id) {
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      default:
        throw new Error('Invalid identified');
    }
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (error) {
      alert(error.message);
      this.setState({ isLoading: false });
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <form
        onSubmit={(e: any) => {
          this.handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <LoaderButton
          className=""
          disabled={!this.validateForm()}
          isLoading={this.state.isLoading}
          text="Login"
          loadingText="Logging in..."
          type="submit"
        />
      </form>
    );
  }
}
