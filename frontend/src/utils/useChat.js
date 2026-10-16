import { useEffect, useRef, useState } from 'react'
import { assistantReply } from '../data/mock.js'

const REPLY_DELAY_MS = 1200

let nextId = 0

export function useChat() {
  const [messages, setMessages] = useState([])
  const [replying, setReplying] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  function send(text) {
    setMessages((m) => [...m, { id: nextId++, role: 'user', text }])
    setReplying(true)
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { id: nextId++, role: 'assistant', text: assistantReply }])
      setReplying(false)
    }, REPLY_DELAY_MS)
  }

  function reset() {
    clearTimeout(timer.current)
    setMessages([])
    setReplying(false)
  }

  return { messages, replying, send, reset }
}
