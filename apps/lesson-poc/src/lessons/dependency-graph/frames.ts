// Move = граница мысли (законченная visual proposition).
// Beat = шаг подачи внутри move (контроль cognitive load).
// Глобальный frame = сквозной номер beat. Move — это граница на ленте beats.

export interface MoveDef {
  label: string;
  beats: { label: string; pause?: boolean }[];
}

export const moves: MoveDef[] = [
  {
    label: 'вот dependency chain',
    beats: [{ label: 'Controller' }, { label: '+ Service' }, { label: '+ Repository' }],
  },
  {
    label: 'Repository → REQUEST',
    beats: [{ label: 'Repository [REQUEST]' }],
  },
  {
    label: 'Service вынужден REQUEST',
    beats: [
      { label: 'забудь scope: R₁ ≠ R₂' },
      { label: 'один S₁ не держит два R' },
      { label: 'Service [REQUEST] + constraint', pause: true },
    ],
  },
  {
    label: 'Controller вынужден REQUEST',
    beats: [{ label: 'Controller [REQUEST] + constraint' }],
  },
  {
    label: 'scope bubbling',
    beats: [{ label: 'имя механизма', pause: true }],
  },
  {
    label: 'Logger не наследует',
    beats: [{ label: 'граф с Logger' }, { label: 'Logger [DEFAULT]' }],
  },
  {
    label: 'вниз не идёт + инвариант',
    beats: [{ label: 'Cache [DEFAULT]' }, { label: 'инвариант', pause: true }],
  },
  {
    label: 'новый граф',
    beats: [{ label: 'предскажи сам', pause: true }],
  },
];

// Пороги на сквозном номере beat (для $derived в сценарии).
export const F: Record<string, number> = {
  CHAIN_CONTROLLER: 0,
  CHAIN_SERVICE: 1,
  CHAIN_REPO: 2,
  REPO_REQUEST: 3,
  MECH_DIFFER: 4,
  MECH_CONFLICT: 5,
  SERVICE_REQUEST: 6,
  CONTROLLER_REQUEST: 7,
  DISCOVERY: 8,
  LOGGER_GRAPH: 9,
  LOGGER_DEFAULT: 10,
  CACHE: 11,
  INVARIANT: 12,
  TRANSFER: 13,
};
