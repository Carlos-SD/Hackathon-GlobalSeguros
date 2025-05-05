"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hola, soy Jarvis, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
      sender: "assistant",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const { toast } = useToast()
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    
    // Simular respuesta del asistente
    setTimeout(() => {
      let response = ""
      
      if (inputValue.toLowerCase().includes("seguro") && inputValue.toLowerCase().includes("auto")) {
        response = "Tu seguro de auto cubre daños por colisión, robo, y responsabilidad civil. La cobertura es hasta 30,000€ con una franquicia de 300€."
      } 
      else if (inputValue.toLowerCase().includes("seguro") && inputValue.toLowerCase().includes("vida")) {
        response = "Tu seguro de vida tiene una cobertura de 500,000€ para tus beneficiarios. Incluye cobertura por fallecimiento e invalidez permanente."
      }
      else if (inputValue.toLowerCase().includes("seguro") && inputValue.toLowerCase().includes("hogar")) {
        response = "Tu seguro de hogar cubre daños estructurales, robo, incendio y responsabilidad civil. La cobertura total es de 150,000€."
      }
      else if (inputValue.toLowerCase().includes("emergencia")) {
        response = "En caso de emergencia, puedes utilizar el botón rojo de asistencia en la parte superior. También puedes llamar directamente al 112."
      }
      else if (inputValue.toLowerCase().includes("reclamación") || inputValue.toLowerCase().includes("siniestro")) {
        response = "Para presentar una reclamación, necesitas: 1) Notificar el incidente, 2) Documentar con fotos y detalles, 3) Enviar la documentación a través de la app o por correo electrónico."
      }
      else if (inputValue.toLowerCase().includes("robo") && inputValue.toLowerCase().includes("bici")) {
        response = "En caso de robo de bicicleta, tu seguro de hogar cubre hasta 600€ si estaba asegurada en la póliza. Necesitarás presentar la denuncia policial y prueba de propiedad."
      }
      else if (inputValue.toLowerCase().includes("choque") || inputValue.toLowerCase().includes("accidente")) {
        response = "En caso de un choque leve, debes: 1) Documentar los daños con fotos, 2) Intercambiar datos con el otro conductor, 3) Notificar a la aseguradora en 24h. Tu franquicia es de 300€."
      }
      else {
        response = "Entiendo tu consulta. Para ayudarte mejor, ¿podrías proporcionar más detalles sobre lo que necesitas saber? Puedo asistirte con información sobre tus pólizas, procedimientos de reclamación o servicios de emergencia."
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[400px] rounded-md border">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`
                  flex items-start gap-2 max-w-[80%]
                  ${message.sender === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                  } 
                  p-3 rounded-lg
                `}
              >
                {message.sender === "assistant" && (
                  <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <User className="h-5 w-5 mt-0.5 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-2 border-t flex gap-2">
        <Input
          placeholder="Escribe un mensaje..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 