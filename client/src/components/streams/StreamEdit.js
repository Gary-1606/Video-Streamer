import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount = () => {
    this.props.fetchStream(this.props.match.params.id);
  };

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading</div>;
    }
    if (this.props.stream.userId !== this.props.userId) {
        return (
            <div className="ui error message">
                <div className="header">
                    You do not have permission to edit this stream
                </div>
            </div>
        )
    }
        return (
            <div>
                <div>{this.renderPermissionBlock}</div>
              <h3>Edit a Stream</h3>
              {/* <StreamForm initialValues={{Title: this.props.stream.Title, Description: this.props.stream.Description}} onSubmit={this.onSubmit}/> */}
              <StreamForm
                initialValues={_.pick(this.props.stream, "Title", "Description")}
                onSubmit={this.onSubmit}
              />
            </div>
          );
    
  }
}

// ownProps is the props of that particular component
// and mapStateToProps has access to that
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps, {
  editStream: editStream,
  fetchStream: fetchStream
})(StreamEdit);
