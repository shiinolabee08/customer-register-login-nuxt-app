import { Auth } from 'aws-amplify';

export default async function ({ redirect, store }) {
  try {
    console.info('Authenticating user session...');
    // Check if the user is authenticated using Amplify Auth
    const user = await Auth.currentAuthenticatedUser();

    // User is authenticated; continue to the route
    console.log(user);
    store.dispatch('setUserSession', user);
  } catch (error) {
    // User is not authenticated; redirect to the login page
    console.log(error);
    return redirect('/login');
  }
}