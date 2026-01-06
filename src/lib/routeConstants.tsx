export const UI_ROUTES = {
  dashboard: '/',
  login: 'login',
  signup: 'signup',
  resetpassword: 'reset-password',
  forgotpassword: 'forgot-password',
  app: 'app',
  accounts: 'accounts',
  NOTFound: '404',
  adminDashboard: '/dashboard',
  callMonitoring: '/call-monitoring',
  viewCallDetails: '/call-monitoring/:callId',
  agentPerformamce: '/agent-performance',
  agentProfile: '/agent-profile',
  viewAgentPerformamce: '/agent-performance/:agentId',
  callRequests: '/call-requests',
  viewAgentProfile: '/agent-profile/:agentId',
  reports: '/reports',
  userManagement: '/user-management',
  teamManagement: '/team-management',
  feedbackForm: '/feedback-form/:callId',
  userList : 'user-list',
  qaEvaluation: 'quality-analysis-evaluation',
  callRecords:'/reports/:agentId',
  criterias:'/criteria',
  addCriteria:'/criteria/add',
  editCriteria: '/criteria/edit/:criteriaId',



  /////////////NON USED ROUTES/////
  callLogs: 'live-coaching',
  transcriptViewer: 'transcript-viewer',
  ahtTrends: 'aht-trends',
  qAScores: 'qa-score',
  sentimentAnalysis: 'sentiment-analysis',
  agentDashboard: '/agent-dashboard',

  /////////////////////////////////
};

export const navigateTo = (route: unknown) => `/${route}`;
