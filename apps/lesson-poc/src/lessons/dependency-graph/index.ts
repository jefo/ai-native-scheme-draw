// Урок L1: одна доска, накопление. Moves → beats.
import type { Component } from 'svelte';
import LessonScenario from './LessonScenario.svelte';
import { moves } from './frames';

export const lesson: {
  title: string;
  moves: { label: string; beats: { label: string; pause?: boolean }[] }[];
  scenario: Component<{ frame: number }>;
} = {
  title: 'L1 · Почему scope одного provider меняет scope других',
  moves,
  scenario: LessonScenario,
};
