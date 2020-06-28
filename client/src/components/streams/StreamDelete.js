import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {

  componentDidMount = () => {
    this.props.fetchStream(this.props.match.params.id);
  };

  onDelete = () => {
      this.props.deleteStream(this.props.match.params.id);
  }
  renderActions = () => {
    return (
      <React.Fragment>
        <button onClick={() => this.onDelete()} className="ui primary button">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </React.Fragment>
    );
  };

  renderContent = () => {
      if(!this.props.stream) {
          return 'Are you sure you want to delete this stream ?'
      }
      return `Are you sure you want to delete this stream with title "${this.props.stream.Title}" ?`
  }

  render() {
    return (
      <div>
        <Modal
          title="Delete Stream"
          description={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, {
  fetchStream: fetchStream,
  deleteStream: deleteStream
})(StreamDelete);
