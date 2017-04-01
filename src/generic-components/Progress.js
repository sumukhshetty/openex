import React, {Component} from 'react';
import ProgressStepsItem from './ProgressStepsItem';
import './Progress.css'

class Progress extends Component {
  render() {
    // DOC: This component expects data in the form
    // of an array of dictionaries containing the following keys:
    // status, label, text
    // for example:
    // [{status: 'Yay', label: '3', text: 'Step 3'}]

    const progress_map = this.props.progress_map;
    return(
      <nav className="progress-steps">
        { progress_map.map(function(params, index) {
          return <ProgressStepsItem
                      key={index}
                      status={params.status}
                      label={params.label !== ''? params.label:(index+1)}
                      text={params.text} />
        })}
      </nav>
    );
  }
}

export default Progress;
