import React from 'react'
import { FormattedMessage } from 'react-intl'

export default () =>
  <div className="flex wrap">
    {Array(4).fill(null).map((value, index) =>
      <div className="w-50">
        <div className="br3 ba pa4 ma3 tc" key={index}>
          <h2>
            <FormattedMessage id={`support.docHeader${index}`} />
          </h2>
          <p className="h3">
            <FormattedMessage id={`support.docBody${index}`} />
          </p>
        </div>
      </div>
    )}
  </div>
