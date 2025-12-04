// src/services/mqttService.js
import mqtt from "mqtt";

let client = null;

export function connectMQTT(username, password) {
  return new Promise((resolve, reject) => {
    client = mqtt.connect("wss://mqtt.teknohole.com/mqtt", {
      username,
      password,
      reconnectPeriod: 0,
    });

    client.on("connect", () => {
      console.log("MQTT connected");
      resolve(client);
    });

    client.on("error", (err) => {
      console.error("MQTT Error:", err);
      reject(err);
    });
  });
}

export function subscribeTopic(topic, callback) {
  if (!client) return;

  client.subscribe(topic, (err) => {
    if (!err) console.log("Subscribed:", topic);
  });

  client.on("message", (t, message) => {
    if (t === topic) callback(message.toString());
  });
}

export function publishCommand(value) {
  if (!client || !client.connected) {
    console.error("MQTT not connected!");
    return;
  }

  const payload = JSON.stringify({ SET: value });

  console.log("Sending:", payload);

  client.publish("topic/penetasan/command", payload, { qos: 0 }, (err) => {
    if (err) console.error("Publish failed:", err);
    else console.log("Publish success");
  });
}

export function disconnectMQTT() {
  if (client) {
    client.end(true);
    console.log("MQTT disconnected");
  }
}
