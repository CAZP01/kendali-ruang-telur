# 🚀 KARTEL - Sistem Login & MQTT

## ✨ Ringkasan Fitur

Aplikasi KARTEL sudah memiliki sistem login dan MQTT lengkap dengan:

- ✅ **Halaman Login** - Form login dengan username & password
- ✅ **Koneksi MQTT** - Terkoneksi dengan broker `wss://mqtt.teknohole.com/mqtt`
- ✅ **Protected Routes** - Dashboard hanya bisa diakses setelah login
- ✅ **Logout Button** - Tombol logout untuk disconnect MQTT dan session
- ✅ **Session Persistence** - Auto-restore session saat refresh page
- ✅ **Real-time Monitoring** - Monitor sensor data dari MQTT broker
- ✅ **Message Logger** - Log all MQTT messages in real-time

---

## 📋 Struktur Folder Project

```
kartel/
├── src/
│   ├── App.jsx                    ← Main app with routing & logout
│   ├── App.css                    ← App styles (Tailwind)
│   ├── index.css                  ← Global styles with Tailwind import
│   ├── main.jsx                   ← React setup with providers
│   ├── context/
│   │   └── AuthContext.jsx        ← Authentication logic & MQTT connect
│   ├── services/
│   │   └── MqttService.js         ← MQTT client management
│   ├── pages/
│   │   ├── Login.jsx              ← Login form page
│   │   └── Dashboard.jsx          ← Protected dashboard
│   ├── components/
│   │   └── ProtectedRoute.jsx     ← Route protection component
│   └── assets/
├── package.json                   ← Dependencies
├── vite.config.js                 ← Vite configuration
├── tailwind.config.js             ← Tailwind CSS configuration
└── index.html                     ← Main HTML
```

---

## 🎯 Quick Start

### 1️⃣ Install Dependencies
```bash
cd d:\inkubator-smart\kartel
npm install
```

### 2️⃣ Run Development Server
```bash
npm run dev
```
Server akan berjalan di: `http://localhost:5173`

### 3️⃣ Login
- **Username:** Gunakan username MQTT broker Anda
- **Password:** Gunakan password MQTT broker Anda
- **Broker:** `wss://mqtt.teknohole.com/mqtt`

### 4️⃣ Dashboard
Setelah login berhasil:
- Lihat real-time sensor data (temperature, humidity)
- Monitor MQTT connection status
- Lihat message log
- Publish test messages

### 5️⃣ Logout
Klik tombol **"Logout"** di navbar untuk:
- Disconnect dari MQTT
- Clear session dari localStorage
- Kembali ke halaman login

---

## 🔐 Alur Autentikasi

### Login Flow
```
User Input (username + password)
        ↓
Validasi Input
        ↓
Simpan ke localStorage
        ↓
Connect ke MQTT dengan credentials
        ↓
Success → Redirect ke Dashboard
atau
Fail → Show error message
```

### Session Persistence
```
App Refresh
        ↓
Cek localStorage untuk user data
        ↓
Jika ada → Reconnect ke MQTT
Jika tidak ada → Redirect ke login
```

### Logout Flow
```
Klik Logout Button
        ↓
mqttService.disconnect()
        ↓
localStorage.removeItem('user')
        ↓
Redirect ke /login
```

---

## 🔌 MQTT Configuration

**Broker:** `wss://mqtt.teknohole.com/mqtt`

**Connection Options:**
```javascript
{
  clientId: "kartel_<uuid>",
  clean: true,
  reconnectPeriod: 3000,
  connectTimeout: 8000,
  keepalive: 30,
  username: "<dari input login>",
  password: "<dari input login>"
}
```

**Default Topic Subscribe:**
```
topic/penetasan/status
```

**Supported Message Format:**
```json
{
  "temperature": 37.5,
  "humidity": 65.2
}
```

---

## 📁 File Reference

### src/context/AuthContext.jsx
- Handles user authentication
- MQTT connection management
- Session persistence
- Methods: `login()`, `logout()`, `restoreSession()`

### src/services/MqttService.js
- MQTT client singleton
- Connection management
- Topic subscription
- Message publishing
- Event listeners

### src/pages/Login.jsx
- Login form UI
- Username & password input
- Show/hide password toggle
- Error message display
- Loading state

### src/pages/Dashboard.jsx
- Real-time sensor data display
- MQTT connection status
- Message log viewer
- Publish test message button

### src/App.jsx
- Main routing configuration
- Navbar with logout button
- Session restore on app load
- MQTT setup for authenticated user

---

## 🎮 Usage Examples

### Login dengan Valid Credentials
```
1. Buka http://localhost:5173
2. Masukkan username MQTT
3. Masukkan password MQTT
4. Klik "Login"
5. Tunggu "Connecting..." spinner
6. Otomatis redirect ke Dashboard
```

### Mengamati MQTT Messages
```
1. Login ke aplikasi
2. Go to Dashboard
3. Lihat "Recent Messages" section
4. Messages akan auto-update saat ada data baru
5. Format: topic, payload, timestamp
```

### Publish Test Message
```
1. Di Dashboard
2. Klik "📤 Publish Test Message"
3. Pesan akan dikirim ke topic: "test/hello"
4. Akan muncul di Recent Messages log
```

### Logout
```
1. Klik "Logout" button di navbar (top-right)
2. MQTT akan disconnect
3. Session akan clear
4. Redirect ke login page
5. Tidak bisa akses dashboard tanpa login ulang
```

---

## 🧪 Testing

### ✅ Test 1: Successful Login
```
Expected:
- Input valid MQTT credentials
- See loading spinner
- MQTT Connected status changes to green
- Dashboard displays
- Navbar shows username
```

### ✅ Test 2: Failed Login
```
Expected:
- Input wrong password
- See error message
- Stay on login page
- Can retry
```

### ✅ Test 3: Session Persistence
```
Expected:
- Login successfully
- Refresh page (Ctrl+R)
- Still logged in
- MQTT auto-reconnects
- Dashboard still accessible
```

### ✅ Test 4: Protected Route
```
Expected:
- Logout or clear localStorage
- Try to access http://localhost:5173/
- Auto redirect to /login
- Can't access dashboard
```

### ✅ Test 5: Logout
```
Expected:
- Click logout button
- MQTT disconnects (offline status)
- Session cleared
- Redirect to login
- Can't access dashboard
```

### ✅ Test 6: MQTT Real-time
```
Expected:
- Login
- Publish message ke broker di topic "topic/penetasan/status"
- Should appear in "Recent Messages" section
- Temperature & Humidity update if included
```

---

## 🔧 Debugging

### Check MQTT Status in Browser Console
```javascript
// Connection status
console.log('MQTT Connected:', mqttService.isConnected())

// Check user session
console.log('User:', JSON.parse(localStorage.getItem('user')))

// Listen to MQTT events
mqttService.on('sensor', console.log)
mqttService.on('connected', status => console.log('MQTT:', status))
```

### Check Local Storage
- DevTools → Application → Local Storage
- Look for key: `user` (contains username, password, token)
- Look for key: `mqtt_client_id` (MQTT client ID)

### Monitor Network (WebSocket)
- DevTools → Network tab
- Filter by WebSocket
- Should show connection to `wss://mqtt.teknohole.com/mqtt`

### Common Errors

| Error | Solution |
|-------|----------|
| MQTT Connection Error | Check username/password, verify internet |
| "User redirect to login after refresh" | Clear localStorage, hard refresh (Ctrl+Shift+R) |
| "Can't see sensor data" | Check if broker is publishing to correct topic |
| "Too many redirects" | Clear localStorage, logout and login again |

---

## 📦 Dependencies

```json
{
  "mqtt": "^5.14.1",              // MQTT Client
  "react": "^19.2.0",              // React Framework
  "react-dom": "^19.2.0",          // React DOM
  "react-router-dom": "^7.10.0",   // Client Routing
  "tailwindcss": "^4.1.17",        // CSS Framework
  "@tailwindcss/vite": "^4.1.17"   // Vite Plugin
}
```

---

## 🎨 UI Features

### Login Page
- Beautiful gradient background
- Card-based design
- Show/hide password toggle
- Error message display
- Loading spinner
- Responsive layout

### Dashboard
- Real-time sensor cards (Temperature, Humidity)
- MQTT status indicator (Online/Offline)
- Recent messages log with timestamps
- Publish test message button
- User info in navbar
- Logout button

### Responsive Design
- Mobile-friendly
- Tablet optimized
- Desktop ready
- Uses Tailwind CSS utility classes

---

## 🚀 Build for Production

```bash
npm run build
```

Output akan di folder `dist/`

### Preview Production Build
```bash
npm run preview
```

---

## 🔒 Security Notes

⚠️ **Important:**
- Password disimpan di localStorage (untuk auto-reconnect)
- Gunakan HTTPS di production
- Consider implementing token-based auth
- Don't log credentials in console logs

### Future Improvements
1. Encrypt password di localStorage
2. Implement refresh token
3. Add password reset functionality
4. 2FA authentication
5. Session timeout after idle time

---

## 📞 Support

Jika ada issues:
1. Check browser console for error messages
2. Verify MQTT broker credentials
3. Check internet connection
4. Clear localStorage and try again
5. Hard refresh page (Ctrl+Shift+R)

---

## 📝 Changelog

### v1.0 - Initial Release (Dec 4, 2025)
- ✅ Login page with form validation
- ✅ MQTT broker connection with credentials
- ✅ Protected dashboard route
- ✅ Session persistence with localStorage
- ✅ Real-time sensor data monitoring
- ✅ MQTT message logging
- ✅ Logout functionality
- ✅ Responsive UI with Tailwind CSS
- ✅ Auto-reconnect on session restore

---

**Status:** ✅ Ready to Use

Sistem sudah siap untuk digunakan! 🎉

Silakan login dengan credentials MQTT broker Anda dan mulai monitoring!
