# 🎯 Quick Reference - KARTEL Login & MQTT System

## 📋 Files Created/Modified

```
✅ src/
   ├── App.jsx                     ← Main routing & logout
   ├── main.jsx                    ← React setup with providers
   ├── context/
   │   └── AuthContext.jsx         ← Auth & MQTT logic
   ├── services/
   │   └── MqttService.js          ← MQTT client
   ├── pages/
   │   ├── Login.jsx               ← Login form
   │   └── Dashboard.jsx           ← Dashboard page
   └── components/
       └── ProtectedRoute.jsx      ← Route guard
✅ tailwind.config.js              ← Tailwind config
✅ README.md                        ← Updated
✅ SETUP.md                         ← Full documentation
```

## 🎮 How to Use

### Start Application
```bash
cd d:\inkubator-smart\kartel
npm install
npm run dev
```

### Login
- Go to `http://localhost:5173`
- Enter MQTT username
- Enter MQTT password
- Click "Login"
- Wait for "Connecting..." message
- Redirect to Dashboard

### Dashboard Features
- 📊 Real-time Temperature display
- 💧 Real-time Humidity display
- 🔌 MQTT Connection status
- 📨 Recent messages log
- 📤 Publish test message button

### Logout
- Click "Logout" button (navbar)
- MQTT disconnects
- Session cleared
- Back to login page

## 🔌 MQTT Configuration

**URL:** `wss://mqtt.teknohole.com/mqtt`

**Default Topic:** `topic/penetasan/status`

**Message Format:**
```json
{
  "temperature": 37.5,
  "humidity": 65.2
}
```

## 🧩 Architecture

```
┌─────────────────────────────────────┐
│         App.jsx (Routing)           │
└────────────┬────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼───┐        ┌───▼───────┐
│ Login │        │ Dashboard │
└───┬───┘        └───┬───────┘
    │                │
    └────┬───────────┘
         │
   ┌─────▼────────┐
   │ AuthContext  │
   │ (useAuth)    │
   └─────┬────────┘
         │
   ┌─────▼──────────┐
   │ MqttService    │
   │ (Singleton)    │
   └────────────────┘
         │
   ┌─────▼──────────────┐
   │ MQTT Broker        │
   │ (wss://mqtt...)    │
   └────────────────────┘
```

## 🔑 Authentication Flow

### Step 1: User Input
```
Login Page
  ├─ Username input
  ├─ Password input
  └─ Submit button
```

### Step 2: Validation & Connection
```
AuthContext.login()
  ├─ Validate inputs
  ├─ Save to localStorage
  ├─ Connect to MQTT
  └─ Set user state
```

### Step 3: Route Protection
```
ProtectedRoute
  ├─ Check isAuthenticated
  ├─ If yes → Show Dashboard
  └─ If no → Redirect to /login
```

### Step 4: Session Persistence
```
App.jsx (on mount)
  ├─ restoreSession()
  ├─ Check localStorage
  └─ Auto-reconnect MQTT if needed
```

## 🛠️ API Methods

### useAuth() Hook
```javascript
import { useAuth } from './context/AuthContext'

const {
  user,              // { username, password, loginTime, token }
  isAuthenticated,   // boolean
  isLoading,         // boolean
  error,             // string | null
  login,             // async (username, password) => boolean
  logout,            // () => void
  restoreSession     // () => void
} = useAuth()
```

### mqttService Object
```javascript
import { mqttService } from './services/MqttService'

// Connection
await mqttService.connect(brokerUrl, { username, password })
mqttService.disconnect(force)
mqttService.isConnected()  // boolean

// Messaging
mqttService.subscribe(topic)
mqttService.publish(topic, message, options)
mqttService.unsubscribe(topic)

// Events
mqttService.on('sensor', (data) => {})      // Sensor data
mqttService.on('connected', (status) => {}) // Connection status
mqttService.on('message', (msg) => {})      // All messages
mqttService.on('error', (err) => {})        // Errors
mqttService.off(event, callback)            // Remove listener
```

## 🧪 Test Scenarios

### ✅ Scenario 1: Happy Path
1. Open app → see login
2. Enter credentials → click login
3. See loading spinner
4. Redirect to dashboard
5. MQTT status = green/connected
6. Click logout → back to login

### ✅ Scenario 2: Wrong Password
1. Open app → see login
2. Enter wrong password
3. See error message
4. Stay on login page

### ✅ Scenario 3: Session Restore
1. Login successfully
2. Refresh page (Ctrl+R)
3. Still logged in
4. MQTT auto-reconnects

### ✅ Scenario 4: Protected Route
1. Logout or clear localStorage
2. Try access `/` directly
3. Auto redirect to `/login`

## 📊 Storage Structure

### localStorage Keys

```javascript
// User Session
{
  "user": {
    "username": "your_username",
    "password": "your_password",
    "loginTime": "2025-12-04T...",
    "token": "token_..."
  }
}

// MQTT Client ID
{
  "mqtt_client_id": "kartel_<uuid>"
}
```

## 🔍 Debugging Commands

```javascript
// In browser console

// Check MQTT
console.log('Connected:', mqttService.isConnected())

// Check user
console.log('User:', JSON.parse(localStorage.getItem('user')))

// Listen to messages
mqttService.on('sensor', data => console.log('Sensor:', data))

// Force logout
localStorage.clear()
location.href = '/login'
```

## 🚀 Production Build

```bash
# Build
npm run build

# Output: dist/ folder

# Preview production build
npm run preview
```

## 📦 Dependencies Summary

| Package | Purpose |
|---------|---------|
| react | UI framework |
| react-router-dom | Client routing |
| mqtt | MQTT client |
| tailwindcss | CSS framework |
| @tailwindcss/vite | Vite plugin |

## ⚠️ Important Notes

1. **Password in localStorage** - For auto-reconnect
2. **MQTT Broker** - `wss://mqtt.teknohole.com/mqtt`
3. **Session** - Auto-restored on app load
4. **Disconnect** - Happens on logout
5. **Auto-reconnect** - Yes, with 3s interval
6. **Connection timeout** - 8 seconds

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Login stuck | Check username/password correct |
| Can't receive data | Verify topic: `topic/penetasan/status` |
| Logout not working | Refresh page, clear localStorage |
| Session not restore | Check localStorage has 'user' key |
| MQTT offline | Check internet, broker URL |

## 📞 Quick Links

- [Full Setup Guide](./SETUP.md)
- [MQTT Broker](https://mqtt.teknohole.com)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [MQTT.js](https://github.com/mqttjs/MQTT.js)

---

**Status:** ✅ Production Ready

**Last Updated:** December 4, 2025

**Version:** 1.0.0
