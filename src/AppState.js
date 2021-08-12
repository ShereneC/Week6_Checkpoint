import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  // NOTE Information that comes from Auth0, login credentials - stuff no one else needs NO ONE info is stored in Auth0  think of user as identity  Not something you need to use inside of hte applilcation - purely for identity purposes.  Currently whoever is logged in.
  user: {},
  // account gets saved in our own database (sandbox) but the information came from auth0 - should an account be able to do x, y or z?  Account is an extension of the user - so they can add bio, graduated, etc.  Currently whoever is logged in.  For every 1 user there is 1 account
  account: {},
  // Essentially just an account - but whoever you're currently looking at.  When you're looking at someone's profile - you see their account stuff, not user stuff.
  profile: {},
  posts: [],
  older: '',
  newer: '',
  ads: []
})
