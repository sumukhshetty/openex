import React, { Component } from 'react'
import face1 from '../images/dhiren.png'
import face2 from '../images/arpan.png'
import { FormattedMessage } from 'react-intl'

export default () =>
  <div className="w-75 center">
    <h2 className="tc w-100 pv3">
      <FormattedMessage id="testimonials.title" />
    </h2>
    <div className="flex wrap mxc">
      <div className="w-50-l w-100 flex col mxs tl pa3">
        <div className="flex cxs h4">
          <p className="fhuge flex cxs mv0">"</p>
          <p className="mv3">
            <FormattedMessage id="testimonials.home1copy" />
          </p>
        </div>
        <div className="flex mv3 mxs cxc">
          <img
            src={face1}
            alt=""
            onClick={() => this.select('review1')}
            className={`mh2 w-auto h3`}
          />
          <div className="flex col mxc cxs">
            <p className="ttu ma0">
              <FormattedMessage id="testimonials.home1name" />
            </p>
            <p className="ftiny">
              <FormattedMessage id="testimonials.home1title" />
            </p>
          </div>
        </div>
      </div>
      <div className="w-50-l w-100 flex col mxs tl pa3">
        <div className="flex cxs h4">
          <p className="fhuge flex cxs mv0">"</p>
          <p className="mv3">
            <FormattedMessage id="testimonials.home2copy" />
          </p>
        </div>

        <div className="flex mv3 mxs cxc">
          <img
            src={face2}
            alt=""
            onClick={() => this.select('review1')}
            className={`mh2 w-auto h3`}
          />
          <div className="flex col mxc cxs">
            <p className="ttu ma0">
              <FormattedMessage id="testimonials.home2name" />
            </p>
            <p className="ftiny">
              <FormattedMessage id="testimonials.home2title" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
