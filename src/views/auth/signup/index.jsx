import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { SocialLogin } from '../../components/common';
import { CustomInput } from '../../components/formik';
import { SIGNIN } from '../../constants/routes';
import { Field, Form, Formik } from 'formik';
import { useDocumentTitle, useScrollTop } from '../../hooks';
import PropType from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/actions/authActions';
import { setAuthenticating, setAuthStatus } from '../../redux/actions/miscActions';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-post är inte giltig.')
    .required('E-post krävs.'),
  password: Yup.string()
    .required('lösenord krävs.')
    .min(8, 'Lösenordslängden bör vara minst 8 tecken.')
    .matches(/[A-Z\W]/g, 'Lösenordet ska innehålla minst en stor bokstav.'),
  fullname: Yup.string()
    .required('Fullständigt namn krävs.')
    .min(4, 'Namnet ska bestå av minst 4 tecken.')
});

const SignUp = ({ history }) => {
  const { isAuthenticating, authStatus } = useSelector((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus
  }));
  const dispatch = useDispatch();

  useScrollTop();
  useDocumentTitle('Registrera dig | Maromatta');

  useEffect(() => () => {
    dispatch(setAuthStatus(null));
    dispatch(setAuthenticating(false));
  }, []);

  const onClickSignIn = () => history.push(SIGNIN);

  const onFormSubmit = (form) => {
    dispatch(signUp({
      fullname: form.fullname.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password.trim()
    }));
  };

  return (
    <div className="auth-content">
      {authStatus?.success && (
        <div className="loader">
          <h3 className="toast-success auth-success">
            {authStatus?.message}
            <LoadingOutlined />
          </h3>
        </div>
      )}
      {!authStatus?.success && (
        <>
          {authStatus?.message && (
            <h5 className="text-center toast-error">
              {authStatus?.message}
            </h5>
          )}
          <div className={`auth ${authStatus?.message && (!authStatus?.success && 'input-error')}`}>
            <div className="auth-main">
              <h3>Sign up to Maromatta</h3>
              <Formik
                initialValues={{
                  fullname: '',
                  email: '',
                  password: ''
                }}
                validateOnChange
                validationSchema={SignInSchema}
                onSubmit={onFormSubmit}
              >
                {() => (
                  <Form>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="fullname"
                        type="text"
                        label="* Full Name"
                        placeholder="John Doe"
                        style={{ textTransform: 'capitalize' }}
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="email"
                        type="email"
                        label="* Email"
                        placeholder="test@example.com"
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="password"
                        type="password"
                        label="* Password"
                        placeholder="Ditt lösenord"
                        component={CustomInput}
                      />
                    </div>
                    <br />
                    <div className="auth-field auth-action auth-action-signup">
                      <button
                        className="button auth-button"
                        disabled={isAuthenticating}
                        type="submit"
                      >
                        {isAuthenticating ? 'Registrerar dig' : 'Registrera dig'}
                        &nbsp;
                        {isAuthenticating ? <LoadingOutlined /> : <ArrowRightOutlined />}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="auth-divider">
              <h6>OR</h6>
            </div>
            <SocialLogin isLoading={isAuthenticating} />
          </div>
          <div className="auth-message">
            <span className="auth-info">
              <strong>Har du redan ett konto?</strong>
            </span>
            <button
              className="button button-small button-border button-border-gray"
              disabled={isAuthenticating}
              onClick={onClickSignIn}
              type="button"
            >
              Logga in
            </button>
          </div>
        </>
      )}
    </div>
  );
};

SignUp.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default SignUp;
