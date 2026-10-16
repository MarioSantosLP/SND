import { useEffect, useRef, useState } from 'react'
import { createId, loadJSON, saveJSON } from './storage.js'

const STORAGE_KEY = 'snd.networks'
const DEPLOY_DELAY_MS = 2500

function loadNetworks() {
  return loadJSON(STORAGE_KEY, []).map((n) =>
    n.status === 'deploying' ? { ...n, status: 'deployed' } : n,
  )
}

export function useNetworks() {
  const [networks, setNetworks] = useState(loadNetworks)
  const timers = useRef(new Set())

  useEffect(() => {
    saveJSON(STORAGE_KEY, networks)
  }, [networks])

  useEffect(() => {
    const active = timers.current
    return () => active.forEach(clearTimeout)
  }, [])

  function update(id, changes) {
    setNetworks((ns) => ns.map((n) => (n.id === id ? { ...n, ...changes } : n)))
  }

  function add(network) {
    const id = createId()
    setNetworks((ns) => [{ ...network, id, createdAt: Date.now() }, ...ns])
    return id
  }

  function remove(id) {
    setNetworks((ns) => ns.filter((n) => n.id !== id))
  }

  function duplicate(id) {
    setNetworks((ns) => {
      const index = ns.findIndex((n) => n.id === id)
      const copy = {
        ...ns[index],
        id: createId(),
        name: `${ns[index].name} (copy)`,
        status: 'saved',
        createdAt: Date.now(),
      }
      return [...ns.slice(0, index + 1), copy, ...ns.slice(index + 1)]
    })
  }

  function deploy(id) {
    update(id, { status: 'deploying' })
    const timer = setTimeout(() => {
      timers.current.delete(timer)
      update(id, { status: 'deployed' })
    }, DEPLOY_DELAY_MS)
    timers.current.add(timer)
  }

  return { networks, add, update, remove, duplicate, deploy }
}
