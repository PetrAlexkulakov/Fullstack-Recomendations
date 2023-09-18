import { useAuth0 } from '@auth0/auth0-react';

export function SocialLoginButton() {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    // <button onClick={() => loginWithRedirect({ connection: 'google-oauth2' } as RedirectLoginOptions<AppState>)}>
    <>
        <button onClick={() => loginWithRedirect()}>
            Войти через Google
        </button>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </button>
    </>
  );
}
