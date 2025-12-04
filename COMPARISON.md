# 📊 Comparison: eggsitter2 vs kartel

## Overview

Kedua project (`eggsitter2` dan `kartel`) memiliki sistem login dan MQTT yang sama, namun dengan beberapa perbedaan dalam fitur dan dashboard.

---

## 🔄 Similarities (Kesamaan)

| Fitur | eggsitter2 | kartel |
|-------|-----------|--------|
| **Login System** | ✅ Username & Password | ✅ Username & Password |
| **MQTT Broker** | ✅ wss://mqtt.teknohole.com/mqtt | ✅ wss://mqtt.teknohole.com/mqtt |
| **Authentication** | ✅ AuthContext | ✅ AuthContext |
| **Session Persistence** | ✅ localStorage | ✅ localStorage |
| **Protected Routes** | ✅ ProtectedRoute component | ✅ ProtectedRoute component |
| **Logout** | ✅ MQTT disconnect | ✅ MQTT disconnect |
| **Responsive UI** | ✅ Tailwind CSS | ✅ Tailwind CSS |
| **Error Handling** | ✅ Yes | ✅ Yes |
| **Auto-reconnect** | ✅ 3s interval | ✅ 3s interval |

---

## 🆚 Differences (Perbedaan)

### eggsitter2 (Advanced)

**Dashboard Features:**
- 🌡️ Temperature control (with setpoint)
- 💧 Humidity control (with setpoint)
- 🥚 Egg age counter (days 1-21)
- 🔥 Heating/Cooling status
- 💨 Humidifier status
- 🔄 Motor turner status
- ⏱️ Next rotation time
- 📈 Trend chart
- 📊 Historical data tracking
- 📝 Data history page
- ℹ️ About page

**Components:**
- TemperatureCard (with control)
- HumidityCard (with control)
- ConfigurationCard (settings)
- TrendChart (data visualization)
- DataHistory (history page)

**Services:**
- StorageService (for data persistence)
- MqttService (MQTT client)

---

### kartel (Lightweight)

**Dashboard Features:**
- 🌡️ Temperature display (real-time)
- 💧 Humidity display (real-time)
- 🔌 MQTT connection status
- 📨 Recent messages logger
- 📤 Publish test message button

**Components:**
- Simple card-based layout
- Message log viewer
- Status indicators

**Services:**
- MqttService (MQTT client)
- No data persistence service (simpler)

---

## 📁 Project Structure

### eggsitter2 Structure
```
src/
├── App.jsx
├── main.jsx
├── context/
│   └── AuthContext.jsx
├── services/
│   ├── MqttService.js
│   └── StorageService.js          ← Additional
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── About.jsx                  ← Additional
├── components/
│   ├── ProtectedRoute.jsx
│   ├── TemperatureCard.jsx        ← Additional
│   ├── HumidityCard.jsx           ← Additional
│   ├── ConfigurationCard.jsx      ← Additional
│   ├── TrendChart.jsx             ← Additional
│   └── DataHistory.jsx            ← Additional
└── assets/
```

### kartel Structure
```
src/
├── App.jsx
├── main.jsx
├── context/
│   └── AuthContext.jsx
├── services/
│   └── MqttService.js
├── pages/
│   ├── Login.jsx
│   └── Dashboard.jsx
├── components/
│   └── ProtectedRoute.jsx
└── assets/
```

---

## 🎯 Use Cases

### eggsitter2 - Full Incubator System
Best for:
- ✅ Complete egg incubator management
- ✅ Temperature & humidity control
- ✅ Historical data analysis
- ✅ Long-term monitoring
- ✅ Advanced settings
- ✅ Data trends visualization

**Ideal for:**
- Professional hatcheries
- Research facilities
- Production environments

---

### kartel - Simple Monitoring
Best for:
- ✅ Quick setup & deployment
- ✅ Real-time data monitoring
- ✅ Basic status checking
- ✅ Message logging
- ✅ Learning & testing
- ✅ Lightweight applications

**Ideal for:**
- Development & testing
- IoT learning projects
- Simple monitoring needs
- API integration testing

---

## 🔌 MQTT Configuration

### Both Projects Use:
```javascript
{
  brokerUrl: 'wss://mqtt.teknohole.com/mqtt',
  sensorTopic: 'topic/penetasan/status',
  clientId: 'auto-generated-uuid',
  cleanSession: true,
  reconnectPeriod: 3000,
  connectTimeout: 8000,
  keepalive: 30
}
```

### Message Format (Both)
```json
{
  "temperature": 37.5,
  "humidity": 65.2
}
```

---

## 📊 Feature Comparison Table

| Feature | eggsitter2 | kartel |
|---------|-----------|--------|
| **Temperature Reading** | ✅ | ✅ |
| **Humidity Reading** | ✅ | ✅ |
| **Temperature Control** | ✅ | ❌ |
| **Humidity Control** | ✅ | ❌ |
| **Setpoint Configuration** | ✅ | ❌ |
| **Egg Age Tracking** | ✅ | ❌ |
| **Heating Status** | ✅ | ❌ |
| **Cooling Status** | ✅ | ❌ |
| **Motor Turner Control** | ✅ | ❌ |
| **Trend Chart** | ✅ | ❌ |
| **History Page** | ✅ | ❌ |
| **Message Logger** | ❌ | ✅ |
| **Publish Messages** | ❌ | ✅ |
| **About Page** | ✅ | ❌ |
| **Storage Service** | ✅ | ❌ |
| **Configuration Panel** | ✅ | ❌ |

---

## 🚀 Deployment

### eggsitter2
```bash
cd eggsitter2
npm install
npm run dev
# Production: npm run build
```

### kartel
```bash
cd kartel
npm install
npm run dev
# Production: npm run build
```

Both use **Vite** for building and development.

---

## 💾 Data Persistence

### eggsitter2
- ✅ localStorage for sensor data
- ✅ Historical data tracking
- ✅ Incubation start date
- ✅ Configuration storage
- Uses **StorageService.js**

### kartel
- ✅ localStorage for session/user
- ✅ localStorage for MQTT client ID
- ❌ No historical data storage
- Simpler approach

---

## 🔐 Authentication Flow

### Both Projects
```
1. User enters username & password
2. Validate inputs
3. Save to localStorage
4. Connect to MQTT with credentials
5. Success → Redirect to Dashboard
6. Failure → Show error & stay on Login

Session Restore:
1. App loads
2. Check localStorage for user
3. If found → Auto-reconnect MQTT
4. Resume session (no login needed)

Logout:
1. Disconnect MQTT
2. Clear localStorage
3. Redirect to login page
```

---

## 📱 UI/UX Differences

### eggsitter2
- Multiple cards per sensor
- Detailed configuration UI
- Trend visualization
- Rich dashboard layout
- More complex interface

### kartel
- Simple clean layout
- Status indicators
- Message logger
- Test message button
- Minimal interface

---

## 🎓 Learning Value

### eggsitter2 - Advanced Topics
- 🎯 Multiple custom components
- 📊 Data visualization (charts)
- 💾 Complex state management
- 📈 Historical data analysis
- 🔧 Advanced configuration UI

### kartel - Foundational Topics
- 🎯 Core React patterns
- 🔐 Authentication basics
- 🔌 MQTT integration
- 📨 Message handling
- 🛡️ Route protection

---

## 🔄 Choosing Between Projects

### Use **eggsitter2** if you need:
- Complete incubator control system
- Temperature & humidity adjustment
- Historical data & trends
- Long-term monitoring
- Advanced features

### Use **kartel** if you need:
- Quick start project
- Basic MQTT monitoring
- Learning React patterns
- Simple real-time display
- Lightweight deployment

---

## 🚀 Migration Path

If you start with **kartel** and want to upgrade to **eggsitter2**:
1. Copy `AuthContext.jsx` from kartel (same code)
2. Copy `MqttService.js` from kartel (same code)
3. Add `StorageService.js` from eggsitter2
4. Replace Dashboard with eggsitter2's Dashboard
5. Add additional components from eggsitter2
6. Merge configuration logic

---

## 📦 Dependencies

### Both Projects
```json
{
  "mqtt": "^5.14.1",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.x",
  "tailwindcss": "^4.1.17",
  "@tailwindcss/vite": "^4.1.17"
}
```

### eggsitter2 Additional
- None (same dependencies)

### kartel Additional
- None (same dependencies)

---

## ✅ Checklist for Both Projects

### Setup
- [ ] Dependencies installed
- [ ] MQTT service created
- [ ] Auth context created
- [ ] Protected route created
- [ ] Login page functional
- [ ] Dashboard created
- [ ] Logout working
- [ ] Session restore working

### Testing
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Dashboard after login
- [ ] Refresh page (session restore)
- [ ] Logout clears session
- [ ] Protected route redirect
- [ ] MQTT connection status
- [ ] Message receiving

---

## 📚 Documentation

### eggsitter2
- `AUTH_MQTT_SETUP.md` - Auth & MQTT documentation
- `QUICK_START.md` - Quick start guide
- `README.md` - Project readme

### kartel
- `README.md` - Project readme
- `SETUP.md` - Complete setup guide
- `QUICK_START.md` - Quick reference
- `IMPLEMENTATION_SUMMARY.md` - Implementation details

---

## 🎯 Summary

| Aspect | eggsitter2 | kartel |
|--------|-----------|--------|
| **Complexity** | High | Low |
| **Features** | Many | Few |
| **Learning Curve** | Steep | Gentle |
| **Setup Time** | Medium | Quick |
| **Lines of Code** | ~2000+ | ~1000+ |
| **Best For** | Production | Learning |
| **Maintenance** | Medium | Easy |
| **Scalability** | High | Low |

---

**Both projects are production-ready!** 🚀

Choose based on your specific needs:
- 🎓 Learning React? → Start with **kartel**
- 🏭 Full system? → Use **eggsitter2**
- 🔄 Both? → Use kartel for testing, eggsitter2 for production

---

**Last Updated:** December 4, 2025
