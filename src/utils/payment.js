// Constants
export const FINE_AMOUNT = 1000;

// Razorpay test configuration
export const RAZORPAY_CONFIG = {
  key: 'rzp_test_frUHF8iU9dpPdq',
  currency: 'INR',
  name: 'Traffic Violation System',
  description: 'Speed Violation Fine Payment',
  theme: {
    color: '#2563eb'
  }
};

let razorpayScriptLoaded = false;

// Load Razorpay script
export const loadRazorpayScript = () => {
  if (razorpayScriptLoaded) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      razorpayScriptLoaded = true;
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Initialize payment
export const initializePayment = async (violationId, amount, onSuccess) => {
  if (!window.Razorpay) {
    throw new Error('Razorpay not initialized. Please try again.');
  }

  try {
    const options = {
      key: RAZORPAY_CONFIG.key,
      amount: amount * 100,
      currency: RAZORPAY_CONFIG.currency,
      name: RAZORPAY_CONFIG.name,
      description: RAZORPAY_CONFIG.description,
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999'
      },
      handler: async (response) => {
        if (response.razorpay_payment_id) {
          await onSuccess(violationId, response.razorpay_payment_id);
        }
      },
      theme: RAZORPAY_CONFIG.theme,
      modal: {
        ondismiss: () => {
          console.log('Payment modal closed');
        }
      }
    };

    return new Promise((resolve, reject) => {
      try {
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on('payment.failed', (response) => {
          reject(new Error('Payment failed'));
        });
        razorpayInstance.open();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw new Error('Payment initialization failed');
  }
};