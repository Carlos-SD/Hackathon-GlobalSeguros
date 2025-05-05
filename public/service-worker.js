// Service Worker para manejar notificaciones push y comandos de voz en segundo plano

self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  return self.clients.claim()
})

// Manejar notificaciones push
self.addEventListener("push", (event) => {
  const data = event.data.json()

  const options = {
    body: data.body,
    icon: "/icons/icon-192.png",
    badge: "/icons/badge-96.png",
    data: data.data || {},
    actions: data.actions || [],
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Manejar clics en notificaciones
self.addEventListener("notificationclick", (event) => {
  const notification = event.notification
  const action = event.action
  const data = notification.data

  notification.close()

  let url = "/"

  if (action === "start-trip") {
    url = "/movilidad?action=start"
  } else if (action === "end-trip") {
    url = "/movilidad?action=end"
  } else if (action === "emergency") {
    url = "/asistente?section=emergency"
  } else if (action === "assistant") {
    url = "/asistente"
  } else if (data && data.url) {
    url = data.url
  }

  event.waitUntil(clients.openWindow(url))
})

// Manejar comandos de voz en segundo plano
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "VOICE_COMMAND") {
    const { command, source } = event.data

    // Procesar el comando de voz
    fetch("/api/process-voice-command", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ command, source }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Notificar al cliente sobre el resultado
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: "VOICE_COMMAND_RESULT",
              result: data,
            })
          })
        })

        // Si es necesario, mostrar una notificación
        if (data.shouldNotify) {
          self.registration.showNotification("SegurApp Asistente", {
            body: data.responseText,
            icon: "/icons/icon-192.png",
            data: data.actionData || {},
          })
        }
      })
      .catch((error) => {
        console.error("Error processing voice command:", error)
      })
  }
})
