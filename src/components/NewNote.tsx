import React, { Component, ChangeEvent } from 'react';
import { config } from '../config';
import { LoaderButton } from './LoaderButton';
import { API } from 'aws-amplify';
import { RouteComponentProps } from 'react-router';
import { s3Upload } from '../libs';

interface Props extends RouteComponentProps {}

interface State extends Note {
  isLoading: boolean;
}

interface Note {
  attachment?: any;
  content: string;
}

export class NewNote extends Component<Props, State> {
  private file: File | null = null;
  public state: State = {
    isLoading: false,
    content: ''
  };

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = (event: any) => {
    this.setState({
      content: event.target.value
    });
  };

  handleFileChange = (event: any) => {
    this.file = event.target.files ? event.target.files[0] : null;
  };

  handleSubmit = async (event: any) => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB`);
      return;
    }
    this.setState({ isLoading: true });

    try {
      const attachment = this.file ? await s3Upload(this.file) : null;

      await this.createNote({
        attachment,
        content: this.state.content
      });
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  };

  createNote(note: Note) {
    return API.post('notes', '/notes', {
      body: note
    });
  }

  render() {
    return (
      <div className="NewNote">
        <form
          onSubmit={(e: any) => {
            this.handleSubmit(e);
          }}
        >
          <div className="form-group">
            <div className="label">Content</div>
            <textarea name="content" id="content" value={this.state.content} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <div className="label">Attachment</div>
            <input type="file" name="file" id="file" onChange={this.handleFileChange} />
          </div>
          <LoaderButton
            className=""
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating..."
          />
        </form>
      </div>
    );
  }
}
