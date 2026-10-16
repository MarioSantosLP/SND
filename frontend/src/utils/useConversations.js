import { useEffect, useRef, useState } from 'react'
import { mockDeploymentResult, mockNetwork, mockProposal } from '../data/mock.js'

const STORAGE_KEY = 'snd.conversations'
const REPLY_DELAY_MS = 1200
const TITLE_MAX_LENGTH = 40

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function makeTitle(text) {
  const firstLine = text.split('\n')[0].trim()
  return firstLine.length > TITLE_MAX_LENGTH
    ? `${firstLine.slice(0, TITLE_MAX_LENGTH).trimEnd()}…`
    : firstLine
}

function loadConversations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

function saveConversations(conversations) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
    return true
  } catch {
    return false
  }
}

export function useConversations() {
  const [conversations, setConversations] = useState(loadConversations)
  const [pending, setPending] = useState([])
  const timers = useRef(new Set())

  useEffect(() => {
    saveConversations(conversations)
  }, [conversations])

  useEffect(() => {
    const active = timers.current
    return () => active.forEach(clearTimeout)
  }, [])

  function updateConversation(id, update) {
    setConversations((cs) => cs.map((c) => (c.id === id ? { ...c, ...update(c) } : c)))
  }

  function addMessage(conversationId, message) {
    updateConversation(conversationId, (c) => ({
      messages: [...c.messages, message],
      updatedAt: Date.now(),
    }))
  }

  function send(conversationId, text) {
    const id = conversationId ?? createId()
    const userMessage = { id: createId(), role: 'user', text }

    if (conversationId) {
      addMessage(id, userMessage)
    } else {
      setConversations((cs) => [
        { id, title: makeTitle(text), messages: [userMessage], updatedAt: Date.now() },
        ...cs,
      ])
    }

    setPending((p) => [...p, id])
    const timer = setTimeout(() => {
      timers.current.delete(timer)
      addMessage(id, { id: createId(), role: 'assistant', proposal: mockProposal, decision: null })
      setPending((p) => p.filter((x) => x !== id))
    }, REPLY_DELAY_MS)
    timers.current.add(timer)

    return id
  }

  function decide(conversationId, messageId, decision) {
    updateConversation(conversationId, (c) => ({
      messages: c.messages.map((m) => (m.id === messageId ? { ...m, decision } : m)),
    }))
  }

  function deploy(conversationId, proposalId) {
    decide(conversationId, proposalId, 'deploy')
    addMessage(conversationId, {
      id: createId(),
      role: 'assistant',
      deployment: {
        startedAt: Date.now(),
        result: mockDeploymentResult,
        network: mockNetwork,
        saved: null,
      },
    })
  }

  function saveNetwork(conversationId, messageId, { name, description }) {
    updateConversation(conversationId, (c) => ({
      messages: c.messages.map((m) =>
        m.id === messageId
          ? {
              ...m,
              deployment: {
                ...m.deployment,
                saved: { name: name.trim(), description: description.trim(), savedAt: Date.now() },
              },
            }
          : m,
      ),
    }))
  }

  const sorted = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt)

  return { conversations: sorted, pending, send, decide, deploy, saveNetwork }
}
