import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from '@use-firebase/app';
import { Suspense } from 'react';
import Loader from './components/Loader/Loader';

const firebaseConfig = {
  apiKey: "AIzaSyBaOBBnwPV4EmOws3dyM5fW6UbdsHCdGH0",
  authDomain: "fosters-c7285.firebaseapp.com",
  projectId: "fosters-c7285",
  storageBucket: "fosters-c7285.appspot.com",
  messagingSenderId: "280561520205",
  appId: "1:280561520205:web:0edacc1660f62f37ec1604"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseAppProvider config={firebaseConfig}>
    <Suspense fallback={Loader}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </FirebaseAppProvider>
);

reportWebVitals();