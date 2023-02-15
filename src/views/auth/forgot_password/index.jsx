import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDidMount, useDocumentTitle, useScrollTop } from '../../hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/authActions';

const ForgotPassword = () => {
  const { authStatus, isAuthenticating } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const [forgotPWStatus, setForgotPWStatus] = useState({});
  const [isSendingForgotPWRequest, setIsSending] = useState(false);
  const [field, setField] = useState({});

  useScrollTop();
  useDocumentTitle('Glömt ditt lösenord | Maromatta');
  useEffect(() => {
    if (didMount) {
      setForgotPWStatus(authStatus);
      setIsSending(isAuthenticating);
    }
  }, [authStatus, isAuthenticating]);

  const onEmailChange = (value, error) => {
    setField({ email: value, error });
  };

  const onSubmitEmail = () => {
    if (!!field.email && !field.error) {
      dispatch(resetPassword(field.email));
    }
  };

  return (
    <div className="forgot_password">
      {forgotPWStatus?.message && (
        <h5 className={`text-center ${authStatus?.success ? 'toast-success' : 'toast-error'}`}>
          {authStatus.message}
        </h5>
      )}
      <h2>Glömt ditt lösenord?</h2>
      <p>Ange din e-postadress så skickar vi ett e-postmeddelande för återställning av lösenord.</p>
      <br />
      <input
        field="email"
        required
        className="input-form"
        label="* email"
        maxLength={40}
        onChange={onEmailChange}
        placeholder="Ange din e-postadress"
        readOnly={isSendingForgotPWRequest || authStatus?.success}
        type="email"
        style={{ width: '100%' }}
      />
      <br />
      <br />
      <button
        className="button w-100-mobile"
        disabled={isSendingForgotPWRequest || authStatus?.success}
        onClick={onSubmitEmail}
        type="button"
      >
        {isSendingForgotPWRequest ? <LoadingOutlined /> : <CheckOutlined />}
        &nbsp;
        {isSendingForgotPWRequest ? 'Skickar e-post för återställning av lösenord' : 'Skicka e-post för återställning av lösenord'}
      </button>
    </div>
  );
};

export default ForgotPassword;
