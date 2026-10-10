
import { create } from 'zustand'
import {anecdotesAtStart, asObject} from './utils'


const useAnecdoteStore = create((set) => ({
  anecdotes: anecdotesAtStart.map(asObject),
  actions: {
    vote: (id) => {
      set((state) => {
        return {anecdotes: state.anecdotes.map(
          (anecdote) => anecdote.id === id
            ? {...anecdote, votes: anecdote.votes + 1}
            : anecdote
        )}
      })
    },
    add: (anecdote) => {
      set((state) => ({anecdotes: state.anecdotes.concat(anecdote)}))
    }}
    })
  )

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
