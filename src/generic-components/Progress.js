import React, {Component} from 'react';
import ProgressStepsItem from './ProgressStepsItem';
import './Progress.css'

class Progress extends Component {
  render() {
    const progress_map = this.props.map;
    return(
      <nav className="progress-steps">
        { progress_map.map(function(params, index) {
          return <ProgressStepsItem
                      key={index}
                      status={params.status}
                      label={params.label}
                      text={params.text} />
        })}
      </nav>
    );
  }
}

export default Progress;
