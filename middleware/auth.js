export default function ({ route, redirect, store }) {
  if (!store.state.authenticated || !store.getters.authenticatedUser) {
    return redirect('/login');
  }

  return next();
}