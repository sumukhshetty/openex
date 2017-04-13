import React, { Component } from 'react';
import '../../css/Progress.css';

class Progress extends Component {
  render () {
    // DOC: This component expects data in the form
    // of an array of dictionaries containing the following keys:
    // status, label, text
    // for example:
    // [{status: 'Yay', label: '3', text: 'Step 3'}]

    const progress_map = this.props.progress_map;
    return (
      <nav className='progress-steps mv5'>
        {progress_map.map(function (params, index) {
           return <ProgressStepsItem
                    key={index}
                    status={params.status}
                    label={params.label !== '' ? params.label : (index + 1)}
                    text={params.text} />;
         })}
      </nav>
    );
  }
}

class ProgressStepsItem extends Component {
  render () {
    const {status, label, text} = this.props;
    const classes = (status === 'completed' || status === 'active' ?
      'progress-steps-item progress-steps-item--' + status : 'progress-steps-item');

    // console.log(status, label, text)

    return (
      <div className={classes}>
        <div className='progress-steps-item-label'>
          <div className='progress-steps-item-icon'>
            {label}
          </div>
          <div className='progress-steps-item-text'>
            {text}
          </div>
        </div>
      </div>
    );
  }
}

export default Progress;
