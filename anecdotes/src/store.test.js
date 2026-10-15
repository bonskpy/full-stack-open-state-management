/**
 * TODO: a test that verifies the state is initialized with the anecdotes returned by the backend.
 */
import { beforeEach, describe, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useAnecdoteActions, useAnecdotes } from "./store";
import * as anecdoteService from "./services/anecdotes";

vi.mock(import("./services/anecdotes"), () => ({
  getAll: vi.fn(),
  createOne: vi.fn(),
  updateOne: vi.fn(),
  deleteOne: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useAnecdoteActions", () => {
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
