import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

export default () => (
  <div className="flex wrap">
    {Array(2)
      .fill(null)
      .map((value, index) => (
        <div className="w-50-l w-100" key={index}>
          <Link to={`/support/${index}`}>
            <div className="br3 ba pa4 ma3 tc">
              <h2>
                <FormattedMessage id={`support.docHeader${index}`} />
              </h2>
              <p className="h3">
                <FormattedMessage id={`support.docBody${index}`} />
              </p>
            </div>
          </Link>
        </div>
      ))}
  </div>
)
