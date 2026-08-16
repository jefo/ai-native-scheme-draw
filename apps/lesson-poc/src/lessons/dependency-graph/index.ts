// Сборка урока: Lesson → Scene → Frame.
// Сцены = непрерывный визуальный контекст (не секции сценария!).
// Фреймы = нарративные reveal'ы внутри сцены.
import type { SceneDef } from '../../lib/Lesson.svelte';
import Scene1BaseModel from './Scene1BaseModel.svelte';

export const lesson: { title: string; scenes: SceneDef[] } = {
  title: 'Dependency Graph & Scope Propagation',
  scenes: [
    {
      id: 'base-model',
      title: 'Базовая модель',
      component: Scene1BaseModel,
      frames: [
        { label: 'пустая доска' },
        { label: 'OrdersService' },
        { label: 'Controller → OrdersService' },
        { label: 'Controller → OrdersService, сосед' },
        { label: 'аномалия видна, правило неизвестно', pause: true },
        { label: 'граф занимает центр' },
        { label: 'стрелки: injects' },
        { label: 'injects подписан' },
        { label: 'direction of resolution ①②③' },
        { label: 'маркеры убраны' },
      ],
    },
  ],
};
