import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseRef } from '../../index';

export default class WhyDidYouCancel extends Component {
  static propTypes = {
    cancelTrade: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    tradeId: PropTypes.string.isRequired
  };

  state = {
    feedback: '',
    userId: undefined
  };

  componentDidMount() {
    this.setState({
      userId: firebaseRef.auth().currentUser.uid
    });
  }

  handleUpdatingFeedback = e => {
    let feedback = this.state.feedback;
    feedback = e.target.value;
    this.setState({ feedback });
  };

  handleSubmit = () => {
    const newTicketKey = firebaseRef
      .database()
      .ref(`/tradeCancellationFeedback`)
      .push().key;
    const feedbackData = {
      id: newTicketKey,
      feedback: this.state.feedback || null,
      tradeId: this.props.tradeId || null,
      userId: this.state.userId || null,
      createdAt: new Date()
    };

    const updates = {};
    updates[newTicketKey] = feedbackData;
    return firebaseRef
      .database()
      .ref(`/tradeCancellationFeedback`)
      .update(updates)
      .then(this.props.cancelTrade())
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div className="flex x absolute--fill fixed bg-black-80 z-1">
        <div className="flex col x bg-white br3 pa3">
          <h2 className="w5">
            Please let us know why you decided to Cancel your trade.
          </h2>

          <textarea
            rows={4}
            placeholder="We are working hard to improve the system, so any feedback on your trading experience will help us make things better."
            value={this.state.feedback}
            onChange={e => this.handleUpdatingFeedback(e)}
            className="ma3 w5"
          />
          <div className="ma3 w5 flex mxb">
            <p className="pointer" onClick={() => this.props.closeModal()}>
              Go Back
            </p>
            {this.props.tradeId ? (
              <button className="bg-danger" onClick={this.handleSubmit}>
                Cancel Trade
              </button>
            ) : (
              <p>Loading Trade Data...</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
