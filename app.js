// app.js - Client-side simulation of the app using localStorage
const App = (function(){
  const LS_KEY = 'premium_request_app_v1';
  const DEFAULTS = {
    users: [
      // Diese Default-Accounts werden beim ersten Start angelegt, sind aber nicht sichtbar.
      { username: 'keyo', password: '2208', role: 'admin', email: '' },
      { username: 'user', password: 'JerryF921', role: 'user', email: '' }
    ],
    requests: []
  };

  function load(){
    const raw = localStorage.getItem(LS_KEY);
    if(!raw){
      const initial = DEFAULTS;
      save(initial);
      return JSON.parse(JSON.stringify(initial));
    }
    try {
      return JSON.parse(raw);
    } catch(e){
      console.error('Corrupt storage, resetting.');
      save(DEFAULTS);
      return JSON.parse(JSON.stringify(DEFAULTS));
    }
  }

  function save(state){
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }

  function ensureCurrentUserInSession(){
    // session in sessionStorage
    const s = sessionStorage.getItem('pra_current_user');
    return s ? JSON.parse(s) : null;
  }

  function setCurrentUser(user){
    sessionStorage.setItem('pra_current_user', JSON.stringify(user));
  }

  function clearCurrentUser(){
    sessionStorage.removeItem('pra_current_user');
  }

  // Public API
  return {
    init: function(){
      load(); // init defaults
    },
    login: function(username, password){
      const state = load();
      const u = state.users.find(x=>x.username === username && x.password === password);
      if(!u) return null;
      const safe = { username: u.username, role: u.role };
      setCurrentUser(safe);
      return safe;
    },
    logout: function(){
      clearCurrentUser();
      location.href = 'index.html';
    },
    requireLogin: function(role){
      const cur = ensureCurrentUserInSession();
      if(!cur) { alert('Bitte zuerst anmelden.'); location.href='index.html'; return; }
      if(role && cur.role !== role){
        alert('Zugriff verweigert.');
        location.href='index.html';
      }
    },
    getAllUsers: function(){
      return load().users.map(u=>({ username: u.username, role: u.role }));
    },
    createUser: function(username, password, role='user'){
      const state = load();
      if(state.users.some(u=>u.username===username)) return false;
      state.users.push({ username, password, role, email: '' });
      save(state);
      return true;
    },
    deleteUser: function(username){
      let state = load();
      state.users = state.users.filter(u=>u.username !== username);
      save(state);
    },
    createRequest: function(title, body){
      const cur = ensureCurrentUserInSession();
      if(!cur) { alert('Nicht angemeldet'); return; }
      const state = load();
      const id = 'r_' + Date.now() + '_' + Math.floor(Math.random()*9999);
      state.requests.push({ id, username: cur.username, title, body, createdAt: Date.now(), reply: null });
      save(state);
    },
    getAllRequests: function(){
      return load().requests.slice().sort((a,b)=>b.createdAt - a.createdAt);
    },
    getRequestsForCurrentUser: function(){
      const cur = ensureCurrentUserInSession();
      if(!cur) return [];
      return load().requests.filter(r => r.username === cur.username).sort((a,b)=>b.createdAt - a.createdAt);
    },
    replyRequest: function(id, text){
      const state = load();
      const r = state.requests.find(x=>x.id===id);
      if(r) r.reply = text;
      save(state);
    },
    deleteRequest: function(id){
      const state = load();
      state.requests = state.requests.filter(x=>x.id !== id);
      save(state);
    },
    // utility for admin UI
    getStateRaw: function(){ return load(); }
  };
})();
