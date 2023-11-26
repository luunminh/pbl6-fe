import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from 'react';
import { firebaseApp } from 'src/firebase';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Toastify } from '@shared';
import { IRootState } from '@redux/store';
import { useSelector } from 'react-redux';

enum RealTimeDbRoute {
  REQUEST_ORDER = '/REQUEST_ORDER',
}

export default () => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const db = ref(getDatabase(firebaseApp), RealTimeDbRoute.REQUEST_ORDER);
    onValue(db, (snapshot) => {
      if (snapshot.exists && !isInitialRender.current && isAuthenticated) {
        Toastify.info('A new order request has just been created !', {
          position: 'top-right',
        });
      }

      if (isAuthenticated) isInitialRender.current = false;
    });

    return () => {
      off(db);
    };
  }, [isAuthenticated]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
