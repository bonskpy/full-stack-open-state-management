import { create } from 'zustand'

const useFeedbackStore = create(set => ({
    good: 0,
    neutral: 0,
    bad: 0,
    actions: {
        handleGood: () => set(state => ({ good: state.good + 1 })),
        handleNeutral: () => set(state => ({ neutral: state.neutral + 1 })),
        handleBad: () => set(state => ({ bad: state.bad + 1 })),
    }
}))


export const useFeedbackGood = () => useFeedbackStore(state => state.good)
export const useFeedbackNeutral = () => useFeedbackStore(state => state.neutral)
export const useFeedbackBad = () => useFeedbackStore(state => state.bad)
export const useFeedbackActions = () => useFeedbackStore(state => state.actions)