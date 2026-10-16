/**
 * TODO:  Write a test that verifies the correct React component receives a properly filtered list of anecdotes.
 */

import { beforeEach, describe, expect, test, vi } from "vitest";
import { act, render, renderHook, screen } from "@testing-library/react";
import { useAnecdoteActions, useAnecdotes, useAnecdoteStore } from "./store";
import * as anecdoteService from "./services/anecdotes";
import AnecdotesList from "./components/AnecdotesList";

vi.mock(import("./services/anecdotes"), () => ({
  getAll: vi.fn(),
  createOne: vi.fn(),
  updateOne: vi.fn(),
  deleteOne: vi.fn(),
}));

const mockAnecdotes = [
  { id: 1, content: "If it hurts, do it more often", votes: 3 },
  {
    id: 2,
    content: "Adding manpower to a late software project makes it later!",
    votes: 7,
  },
  {
    id: 3,
    content: "Premature optimization is the root of all evil.",
    votes: 1,
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Anecdotets before initialization", () => {
  test("state is initialized with the anecdotes returned by the backend", async () => {
    const mockAnecdotes = [
      { id: 1, content: "If it hurts, do it more often", votes: 0 },
      {
        id: 2,
        content: "Adding manpower to a late software project makes it later!",
        votes: 0,
      },
    ];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.init();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());

    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });
});

describe("Anecdotes after initialization", () => {
  beforeEach(async () => {
    useAnecdoteStore.setState({ anecdotes: [], filterText: "" });
  });

  test("component displaying anecdotes receives the anecdotes from the store sorted by votes", async () => {
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filterText: "" });
    const { result: whenPassed } = renderHook(() => useAnecdotes());
    const anecdotesPassed = await act(async () => await whenPassed.current);

    expect(anecdotesPassed).not.toStrictEqual(
      mockAnecdotes,
    );
    expect(anecdotesPassed).toStrictEqual(
      mockAnecdotes.toSorted((a, b) => b.votes - a.votes),
    );
  });
  test("correct React component receives a properly filtered list of anecdotes", async () => {
    act(() => useAnecdoteStore.setState({ anecdotes: mockAnecdotes }));

    render(<AnecdotesList />);
    expect(await screen.findAllByTestId("anecdotes-list-item")).toHaveLength(3);

    act(() => useAnecdoteStore.setState({ filterText: "software" }));
    expect(await screen.findAllByTestId("anecdotes-list-item")).toHaveLength(1);
  });

  test("voting increases the number of votes for an anecdote", async () => {
    const anecdote = {
      id: 1,
      content: "If it hurts, do it more often",
      votes: 3,
    };
    useAnecdoteStore.setState({ anecdotes: [anecdote] });
    anecdoteService.updateOne.mockResolvedValue({
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    const { result: actions } = renderHook(() => useAnecdoteActions());
    await act(async () => await actions.current.vote(1));

    const { result: anecdotes } = renderHook(() => useAnecdotes());
    expect(anecdotes.current[0].votes).toBe(4);
  });
});
