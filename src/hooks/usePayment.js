import { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { loadRazorpayScript, initializePayment, FINE_AMOUNT } from '../utils/payment';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (violationId) => {
    try {
      setLoading(true);
      setError(null);

      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Handle successful payment
      const handlePaymentSuccess = async (violationId, paymentId) => {
        try {
          // Delete the violation record
          await deleteDoc(doc(db, 'VehicleLicensePlate', violationId));
          console.log('Payment successful:', paymentId);
          window.location.reload(); // Refresh to update the violations list
        } catch (err) {
          console.error('Error processing payment:', err);
          setError('Payment successful but failed to update records');
        }
      };

      // Initialize payment
      await initializePayment(violationId, FINE_AMOUNT, handlePaymentSuccess);
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading, error };
};