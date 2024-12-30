import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const useViolations = () => {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        // Get user's vehicle number
        const userDoc = await getDocs(
          query(collection(db, 'users'), where('email', '==', user.email))
        );

        if (userDoc.empty) {
          setLoading(false);
          return;
        }

        const userData = userDoc.docs[0].data();
        const vehicleNumber = userData.vehicleNumber.toUpperCase();

        // Fetch violations for user's vehicle
        const violationsQuery = query(
          collection(db, 'VehicleLicensePlate'),
          where('NumberPlate', '==', vehicleNumber)
        );

        const violationsSnapshot = await getDocs(violationsQuery);
        const violationsList = violationsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setViolations(violationsList);
      } catch (err) {
        console.error('Error fetching violations:', err);
        setError('Failed to load violations');
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, []);

  return { violations, loading, error };
};