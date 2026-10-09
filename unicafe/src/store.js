import { create } from 'zustand'

const useFeedbackStore = create(set => ({
    good: 0,
    neutral: 0,
    bad: 0,
    addFeedback: feedback => set(state => ({
        [feedback]: state[feedback] + 1
    }))
}))


export const useFeedbackGood = () => useFeedbackStore(state => state.good)
export const useFeedbackNeutral = () => useFeedbackStore(state => state.neutral)
export const useFeedbackBad = () => useFeedbackStore(state => state.bad)
export const useFeedbackAdder = () => useFeedbackStore(state => state.addFeedback)