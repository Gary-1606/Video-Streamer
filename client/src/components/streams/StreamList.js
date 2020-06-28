import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount = () => {
    this.props.fetchStreams();
  };

  renderEditDeleteButtons = stream => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
            <Link to={`streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
            <Link to={`streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>  
      );
    }
  };

  renderCreateButton = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  renderList = () => {
    const { streams } = this.props;
    return streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderEditDeleteButtons(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link className="header" to={`streams/${stream.id}`}>{stream.Title}</Link>
            <div>{stream.Description}</div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <h3>Streams</h3>
        <div className="ui celled list">{this.renderList()}</div>
        <div>{this.renderCreateButton()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // converts the objects value into an array
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, {
  fetchStreams: fetchStreams
})(StreamList);
