/*import React from 'react';
import RecoverEmail from './RecoverEmail';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';


const EmailHandler = (props) => {
  const mode = props.location.query.mode
  const actionCode = props.location.query.oobCode;
  switch (mode) {
    case 'recoverEmail':
      // Display reset password handler and UI.
      return <RecoverEmail actionCode={actionCode} />;
    case 'resetPassword':
      // Display email recovery handler and UI.
      return <ResetPassword actionCode={actionCode} />;
    case 'verifyEmail':
      // Display email verification handler and UI.
      return <VerifyEmail actionCode={actionCode} />;
    default:
      // Error: invalid mode.
      return (
        <div className="Action">
          <h1>Error encountered</h1>
          <p>The selected page mode is invalid.</p>
        </div>
      );
  }
}*/