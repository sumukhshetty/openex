import React, { Component } from 'react';
import face1 from '../images/testimonials/dhiren.png';
import face2 from '../images/testimonials/arpan.png';
import face3 from '../images/testimonials/enamakel.jpg';
import { FormattedMessage } from 'react-intl';

export default () => (
  <div className="w-75 center">
    <h2 className="tc w-100 pv3">
      <FormattedMessage id="testimonials.title" />
    </h2>
    <div className="flex wrap mxc">
      <div className="w-33-l w-100 flex col mxs tl pa3">
        <div className="flex cxs h4">
          <p className="fhuge flex cxs mv0">"</p>
          <p className="mv3">
            Ezether’s escrow system was absolutely wonderful and quick. It gave
            me a sense of security and the marketplace gave me ether at the best
            price. I’m definitely using ezether for all my ether transactions.
          </p>
        </div>
        <div className="flex mv3 mxs cxc">
          <img
            src={face3}
            alt="Steven Enamakel"
            onClick={() => this.select('review1')}
            className={`mh2 w-auto h3 br-100`}
          />
          <div className="flex col mxc cxs">
            <p className="ttu ma0">Steven Enamakel</p>
            <p className="ftiny">
              Founder & CEO
              <a href="https://bigindian.co/" target="_blank">
                {' '}
                bigindian.co
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="w-33-l w-100 flex col mxs tl pa3">
        <div className="flex cxs h4">
          <p className="fhuge flex cxs mv0">"</p>
          <p className="mv3">
            <FormattedMessage id="testimonials.home1copy" />
          </p>
        </div>
        <div className="flex mv3 mxs cxc">
          <img
            src={face1}
            alt="Dhiren"
            onClick={() => this.select('review1')}
            className={`mh2 w-auto h3 br-100`}
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
      <div className="w-33-l w-100 flex col mxs tl pa3">
        <div className="flex cxs h4">
          <p className="fhuge flex cxs mv0">"</p>
          <p className="mv3">
            <FormattedMessage id="testimonials.home2copy" />
          </p>
        </div>

        <div className="flex mv3 mxs cxc">
          <img
            src={face2}
            alt="Arpan"
            onClick={() => this.select('review1')}
            className={`mh2 w-auto h3 br-100`}
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
);
