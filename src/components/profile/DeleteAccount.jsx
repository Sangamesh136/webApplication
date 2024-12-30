import React, { useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DeleteAccount() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Delete user data from Firestore
      await deleteDoc(doc(db, 'users', user.uid));
      
      // Delete user account
      await deleteUser(user);
      
      navigate('/login');
    } catch (err) {
      setError('Failed to delete account. Please try again.');
      console.error('Error deleting account:', err);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-red-600">Delete Account</h3>
          <p className="text-sm text-gray-500">
            Once deleted, all your data will be permanently removed.
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <Trash2 className="h-4 w-4" />
          Delete Account
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Account Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}