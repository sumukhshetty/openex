import React, {Component} from 'react';

class ProgressStepsItem extends Component {
  render() {
    const {status, label, text} = this.props;
    const classes = (status === 'completed' || 'active'?
        'progress-steps-item progress-steps-item--'+status:'progress-steps-item');

    // console.log(status, label, text);

    return(
      <div className={classes}>
        <div className="progress-steps-item-label">
          <div className="progress-steps-item-icon">{label}</div>
          <div className="progress-steps-item-text">{text}</div>
        </div>
      </div>
    )
  }
}

export default ProgressStepsItem;
