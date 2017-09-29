import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Donut } from 'rebass';
import Email from '../../images/onboarding/mail.js';
import Kyc from '../../images/onboarding/upload-cloud.js';
import Transaction from '../../images/onboarding/shopping-cart.js';
import Ad from '../../images/onboarding/trending-up.js';
import Phone from '../../images/onboarding/smartphone.js';
import Notifications from '../../images/onboarding/notifications.js';
import { firebaseRef } from '../../index.js';
import { notify } from 'react-notify-toast';

export default class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailIsVerified: false,
      phoneIsVerified: null,
      kycIsVerified: null,
      completedATrade: null,
      createdAnAd: null,
      status: null
    };
    this.handleEmailConfirmation = this.handleEmailConfirmation.bind(this);
  }

  componentDidMount() {
    firebaseRef
      .database()
      .ref(`users/${firebaseRef.auth().currentUser.uid}`)
      .once('value')
      .then(snap =>
        this.setState({
          // emailIsVerified: snap.val().verifiedEmail,
          phoneIsVerified: snap.val().verifiedPhoneNumber,
          kycIsVerified: snap.val().verifiedIdentification,
          completedATrade: snap.val().completedtrades !== null,
          createdAnAd: snap.val().advertisements !== null
        })
      );
  }

  async handleEmailConfirmation() {
    const user = await firebaseRef.auth().currentUser;

    const userEmail = await firebaseRef
      .database()
      .ref(`notificationsConfig/${user.uid}/email`)
      .once('value')
      .then(snap => snap.val());

    console.log('userEmail', userEmail);

    const credential = firebaseRef.auth().EmailAuthProvider.credential(
      userEmail
      // password
    );

    user.auth.reauthenticate(credential).then(() => {
      user
        .updateEmail(userEmail)
        .then(function() {
          user
            .sendEmailVerification()
            .then(() => {
              this.setState({
                status: 'Confirmation Email sent. Please check your inbox'
              });
              console.log('user', user);
            })
            .catch(error =>
              console.log('sending confirmation email error A', error.message)
            );
        })
        .catch(error => notify.show(error.message));
    });
  }
  render() {
    let phone = this.state.phoneIsVerified ? 1 : 0;
    let email = this.state.emailIsVerified ? 1 : 0;
    let kyc = this.state.kycIsVerified ? 1 : 0;
    let ad = this.state.createdAnAd ? 1 : 0;
    let trade = this.state.completedATrade ? 1 : 0;
    let notifications = this.state.notifications ? 1 : 0;
    let total = phone + email + kyc + ad + trade + notifications;

    return (
      <div className="w-100 flex wrap mv4" data-test="onboardingBox">
        <Donut value={total / 6} strokeWidth={10} size={256} color="blue" />
        <div className="flex col wrap h5-l bl b---gray ml4">
          <OnboardingStep
            testhandle="onboardingConfirmEmail"
            icon={<Email complete={this.state.emailIsVerified} />}
            title="Confirm Email Address"
            actionHandler={this.handleEmailConfirmation}
            complete={this.state.emailIsVerified}
          />
          <OnboardingStep
            testhandle="onboardingConfirmPhone"
            icon={<Phone complete={this.state.phoneIsVerified} />}
            title="Confirm phone number"
            actionHandler={() => console.log('dog')}
            complete={this.state.phoneIsVerified}
          />
          <OnboardingStep
            testhandle="onboardingConfirmAd"
            icon={<Ad complete={this.state.createdAnAd} />}
            title="Post an advetisement"
            actionHandler={() => console.log('dog')}
            complete={this.state.createdAnAd}
          />
          <OnboardingStep
            testhandle="onboardingConfirmTrade"
            icon={<Transaction complete={this.state.completedATrade} />}
            title="Complete a transaction"
            actionHandler={() => console.log('dog')}
            complete={this.state.completedATrade}
          />
          {/* <OnboardingStep
            testhandle="onboardingConfirmKyc"
            icon={<Kyc complete={this.state.kycIsVerified} />}
            title="Upload KYC documentation"
            actionHandler={() => console.log('dog')}
            complete={this.state.kycIsVerified}
          /> */}
          <OnboardingStep
            testhandle="onboardingAllowNotifications"
            icon={<Notifications complete={this.state.notificationsAllowed} />}
            title="Allow Trade Notifications"
            actionHandler={() => console.log('dog')}
            complete={this.state.notificationsAllowed}
          />
        </div>
      </div>
    );
  }
}

Onboarding.propTypes = {};
Onboarding.defaultProps = {};

const OnboardingStep = ({
  testhandle,
  icon,
  title,
  actionHandler,
  complete
}) => {
  return complete ? (
    <div className="flex cxc pv3 pl5" data-test={testhandle}>
      {icon}
      <p className="ml3 blue">{title}</p>
    </div>
  ) : (
    <div
      className="flex cxc pv3 pl5 pointer grow"
      data-test={testhandle}
      onClick={actionHandler}
    >
      {icon}
      <p className="ml3">{title}</p>
    </div>
  );
};

OnboardingStep.propTypes = {
  testhandle: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  actionHandler: PropTypes.func.isRequired,
  complete: PropTypes.bool.isRequired
};

OnboardingStep.defaultProps = { complete: false };
