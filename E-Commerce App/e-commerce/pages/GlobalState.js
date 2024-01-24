// GlobalState.js
let paymentInfo = null;

export const setPaymentInfo = (info) => {
  paymentInfo = info;
};

export const getPaymentInfo = () => {
  return paymentInfo;
};
