import React, { Component } from 'react'
import Docs from './Documentation'
import SupportForm from './SupportForm'
import { FormattedMessage } from 'react-intl'

class Support extends Component {
  render() {
    return (
      <div>
        <div className="bg-smoke pt5">
          <div className="w-75 center pv3">
            <div className="measure-wide mv3">
              <h1 className="b">
                <FormattedMessage id="support.header" />
              </h1>
              {/* <p>
                <FormattedMessage id="support.byline" />
              </p> */}
            </div>
            {/* <Docs /> */}
          </div>
        </div>
        <div className="w-75 center pv3">
          <SupportForm />
        </div>
      </div>
    )
  }
}

export default Support
