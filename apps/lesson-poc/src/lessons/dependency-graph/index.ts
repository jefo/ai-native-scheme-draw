// Сборка урока: Lesson → Scene → Frame.
// Сцены = непрерывный визуальный контекст (не секции сценария!).
// Фреймы = нарративные reveal'ы внутри сцены.
import type { SceneDef } from '../../lib/Lesson.svelte';
import Scene1BaseModel from './Scene1BaseModel.svelte';
import SceneA_Order from './v2/SceneA_Order.svelte';
import SceneB_Propagation from './v2/SceneB_Propagation.svelte';
import SceneC_Transfer from './v2/SceneC_Transfer.svelte';

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

// Вторая редакция — «расследование поведения контейнера» (семпл, кандидат).
// Приём 2: предыстория дана, управление в точке сути урока.
export const lessonV2: { title: string; scenes: SceneDef[] } = {
  title: 'L1 · Расследование: scope в графе',
  scenes: [
    {
      id: 'order',
      title: 'The Order',
      component: SceneA_Order,
      frames: [
        { label: 'split screen: юзер + знакомый граф' },
        { label: 'событие: Service → REQUEST' },
        { label: 'вопрос: Controller [?]' },
        { label: 'пауза: что с контроллером?', pause: true },
      ],
    },
    {
      id: 'propagation',
      title: 'Propagation',
      component: SceneB_Propagation,
      frames: [
        { label: 'reveal: Controller тоже REQUEST' },
        { label: 'ловушка: Repository [?]' },
        { label: 'reveal: Repository DEFAULT (вниз ничего)' },
        { label: 'асимметрия ↑/↓' },
      ],
    },
    {
      id: 'transfer',
      title: 'Новый граф',
      component: SceneC_Transfer,
      frames: [
        { label: 'вопрос: кто request-scoped?', pause: true },
        { label: 'reveal: Controller да · PricingService нет' },
      ],
    },
  ],
};
