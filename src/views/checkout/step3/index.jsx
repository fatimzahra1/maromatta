import { CHECKOUT_STEP_1 } from '../../../constants/routes';
import { Form, Formik } from 'formik';
import { displayActionMessage } from '../../../helpers/utils';
import { useDocumentTitle, useScrollTop } from '../../../hooks';
import PropType from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import Total from './Total';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Namnet ska bestå av minst 4 tecken.')
    .required('Namn krävs'),
  cardnumber: Yup.string()
    .min(13, 'Kortnumret bör vara 13-19 siffror långt')
    .max(19, 'Kortnumret bör endast vara 13-19 siffror långt')
    .required('Kortnummer krävs.'),
  expiry: Yup.date()
    .required('Kreditkortets giltighetstid krävs.'),
  ccv: Yup.string()
    .min(3, 'CCV-längden ska vara 3-4 siffror')
    .max(4, 'CCV-längden bör endast vara 3-4 siffror')
    .required('CCV krävs.'),
  type: Yup.string().required('Välj betalningssätt')
});

const Payment = ({ shipping, payment, subtotal }) => {
  useDocumentTitle('Kolla in sista steget | Maromatta');
  useScrollTop();

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'paypal'
  };

  const onConfirm = () => {
    displayActionMessage('Funktionen är inte klar ännu :)', 'info');
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        validate={(form) => {
          if (form.type === 'paypal') {
            displayActionMessage('Funktionen är inte klar ännu :)', 'info');
          }
        }}
        onSubmit={onConfirm}
      >
        {() => (
          <Form className="checkout-steg-3">
            <CreditPayment />
            <PayPalPayment />
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiry: PropType.string,
    ccv: PropType.string,
    type: PropType.string
  }).isRequired,
  subtotal: PropType.number.isRequired
};

export default withCheckout(Payment);
