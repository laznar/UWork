export const types = {
  login: '[Auth] Login',
  logout: '[Auth] Logout',
  loading: '[Auth UI] Loading',
  setUserData: '[Auth] Update',
  setResults: '[Results] Update',
  setResultsLoading: '[Results] Loading'
};

export const opportunitiesTypes = {
  updateOpportunity: '[Opportunities] Update opportunitie',
  setOpportunities: '[Opportunities] Update',
  setOpportunitiesLoading: '[Opportunities] Loading'
};

export const dashboardTypes = {
  setUsersCount: '[Dashboard] Update users count',
  setWorkersCount: '[Dashboard] Update workers count',
  setCustomersCount: '[Dashboard] Update customers count',
  setUsersCountsLoading: '[Dashboard] Loading users counts',
  setOpportunitiesCount: '[Dashboard] Update opportunities count',
  setOpportunitiesCountLoading: '[Dashboard] Loading opportunities count'
};

export const chatTypes = {
  setChatData: '[Chat] Set chat data',
  setChatLoading: '[Chat] Loading chat',
  setSendingLoading: '[Chat] Loading sending'
};
