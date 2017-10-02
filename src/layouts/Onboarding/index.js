import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Donut } from 'rebass';
import Email from '../../images/onboarding/mail.js';
// import Kyc from '../../images/onboarding/upload-cloud.js';
import Transaction from '../../images/onboarding/shopping-cart.js';
import Ad from '../../images/onboarding/trending-up.js';
import Phone from '../../images/onboarding/smartphone.js';
import Notifications from '../../images/onboarding/notifications.js';
import Completed from '../../images/onboarding/complete.js';
import { firebaseRef } from '../../index.js';
import { notify } from 'react-notify-toast';
import * as firebase from 'firebase';
import EnableNotifications from '../../enablenotifications/layouts/EnableNotifications';
import { connect } from 'react-redux';

class _Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailIsVerified: false,
      phoneIsVerified: null,
      // kycIsVerified: null,
      completedATrade: null,
      createdAnAd: null,
      status: null
    };
    this.handleEmailConfirmation = this.handleEmailConfirmation.bind(this);
    this.handlePhoneConfirmation = this.handlePhoneConfirmation.bind(this);
  }

  componentDidMount() {
    firebaseRef
      .database()
      .ref(`users/${firebaseRef.auth().currentUser.uid}`)
      .on('value', snap => {
        if (snap.val().completedtrades !== null) {
          firebaseRef
            .database()
            .ref(`users/${firebaseRef.auth().currentUser.uid}/onboarding`)
            .update({
              completedtrades: true
            });
        }

        if (snap.val().advertisements !== null) {
          firebaseRef
            .database()
            .ref(`users/${firebaseRef.auth().currentUser.uid}/onboarding`)
            .update({
              advertisements: true
            });
        }

        this.setState({
          emailIsVerified: firebaseRef.auth().currentUser.emailVerified,
          phoneIsVerified: firebaseRef.auth().currentUser.phoneNumber,
          // kycIsVerified: snap.val().verifiedIdentification,
          completedATrade: snap.val().onboarding.completedtrades,
          createdAnAd: snap.val().onboarding.advertisements
        });
      });
  }

  handleEmailConfirmation() {
    const userEmail = firebaseRef
      .database()
      .ref(`notificationsConfig/${firebaseRef.auth().currentUser.uid}/email`)
      .once('value')
      .then(snap => snap.val());

    firebaseRef
      .auth()
      .currentUser.updateEmail(userEmail)
      .then(() => firebaseRef.auth().currentUser.sendEmailVerification())
      .then(() =>
        notify.show('Confirmation Email sent. Please check your inbox')
      )
      .catch(error => notify.show(error.message));
  }

  handlePhoneConfirmation() {
    var applicationVerifier = new firebase.auth
      .RecaptchaVerifier('phone-confirmation-button', {
      size: 'invisible'
    });
    let phoneNumber = window.prompt(
      'Please enter your telephone number.' +
        ' Please include the country code.'
    );
    var provider = new firebase.auth.PhoneAuthProvider();

    provider
      .verifyPhoneNumber(phoneNumber, applicationVerifier)
      .then(function(verificationId) {
        var verificationCode = window.prompt(
          'Please enter the verification ' +
            'code that was sent to your mobile device.'
        );
        return firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );
      })
      .then(function(phoneCredential) {
        firebaseRef
          .auth()
          .currentUser.linkWithCredential(phoneCredential)
          .then(
            function(user) {
              console.log('Account linking success', user);
              notify.show('Account linking success');
            },
            function(error) {
              console.log('Account linking error', error);
              notify.show('Account linking error', error.message);
            }
          );
      })
      .catch(error => {
        console.log(error.message);
        notify.show(error.message);
      });
  }

  render() {
    console.log('HELLO', this.props.user.profile.shownotificationrequest);
    let phone = this.state.phoneIsVerified ? 1 : 0;
    let email = this.state.emailIsVerified ? 1 : 0;
    // let kyc = this.state.kycIsVerified ? 1 : 0;
    let ad = this.state.createdAnAd ? 1 : 0;
    let trade = this.state.completedATrade ? 1 : 0;
    let notifications = this.props.user.profile.shownotificationrequest ? 0 : 1;
    let total = phone + email + ad + trade + notifications;

    if (total === 5) {
      return null;
    }

    return (
      <div
        className="w-100 flex wrap mv4 pa3 bg-white br3"
        data-test="onboardingBox"
      >
        <Donut value={total / 5} strokeWidth={15} size={256} color="blue" />
        <div className="flex col wrap h5-l bl b---gray ml4 w-auto">
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
            actionHandler={this.handlePhoneConfirmation}
            complete={this.state.phoneIsVerified}
          />
          <div id="phone-confirmation-button" />
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
          {/* <OnboardingStep
            testhandle="onboardingAllowNotifications"
            icon={<Notifications complete={this.state.notificationsAllowed} />}
            title="Allow Trade Notifications"
            actionHandler={() => console.log('dog')}
            complete={this.state.notificationsAllowed}
          /> */}
          <EnableNotifications />
        </div>
      </div>
    );
  }
}

_Onboarding.propTypes = { user: PropTypes.object.isRequired };

const OnboardingStep = ({
  testhandle,
  icon,
  title,
  actionHandler,
  complete
}) => {
  return complete ? (
    <div className="flex cxc pv3 pl5" data-test={testhandle}>
      <Completed />
      <p className="ml3">{title}</p>
    </div>
  ) : (
    <div
      className="flex cxc pv3 pl5 pointer grow"
      data-test={testhandle}
      onClick={actionHandler}
    >
      {icon}
      <p className="ml3 blue">{title}</p>
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};

const Onboarding = connect(mapStateToProps)(_Onboarding);

export default Onboarding;
