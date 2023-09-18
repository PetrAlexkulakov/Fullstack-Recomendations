import './App.scss'
import AppRouter from './pages/AppRouter'
import './shared/localization'
import { Auth0Provider } from '@auth0/auth0-react';

const auth0Config = {
  domain: 'dev-mg7sfg2imb3e7g08.us.auth0.com',
  clientId: '42qiYiAxmGXFzcwO2RjefiZ10rHsy4Bv',
  authorizationParams: { redirect_uri: window.location.origin },
  // responseType: 'token id_token'
};

function App() {
  return (
    <Auth0Provider {...auth0Config}>
      <AppRouter />
    </Auth0Provider>
  )
}

export default App
