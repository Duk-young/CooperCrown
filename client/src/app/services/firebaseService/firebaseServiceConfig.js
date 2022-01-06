const prodConfig = {
  apiKey: 'AIzaSyAF1xZowZa3YRm1Wy8khTgGwtGn2q9SiS0',
  authDomain: 'coopercrwn-4b81a.firebaseapp.com',
  projectId: 'coopercrwn-4b81a',
  databaseURL: 'https://coopercrwn-4b81a-default-rtdb.firebaseio.com',
  storageBucket: 'coopercrwn-4b81a.appspot.com',
  messagingSenderId: '280203766522',
  appId: '1:280203766522:web:01a8be6a0715ea3d8ef743',
  measurementId: 'G-5VMWQ6RK5M'
};

const devConfig = {
  apiKey: 'AIzaSyAF1xZowZa3YRm1Wy8khTgGwtGn2q9SiS0',
  authDomain: 'coopercrwn-4b81a.firebaseapp.com',
  projectId: 'coopercrwn-4b81a',
  databaseURL: 'https://coopercrwn-4b81a-default-rtdb.firebaseio.com',
  storageBucket: 'coopercrwn-4b81a.appspot.com',
  messagingSenderId: '280203766522',
  appId: '1:280203766522:web:01a8be6a0715ea3d8ef743',
  measurementId: 'G-5VMWQ6RK5M'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
