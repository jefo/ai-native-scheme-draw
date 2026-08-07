/** Project state — in-memory store for projects, scenes, and frames. */

export interface Frame {
  id: string;
  name: string;
  /** Visual composition data — primitives to render. Wireframe for now. */
  content: string;
}

export interface Scene {
  id: string;
  name: string;
  frames: Frame[];
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  scenes: Scene[];
}

let _projects = $state<Project[]>(seedProjects());

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function seedProjects(): Project[] {
  return [
    {
      id: uid(),
      name: 'System Design: CAP Theorem',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      scenes: [
        {
          id: uid(),
          name: 'Intro: Pick Two',
          frames: [
            { id: uid(), name: 'Title card', content: 'CAP Theorem: Consistency · Availability · Partition Tolerance' },
            { id: uid(), name: 'Network Partition', content: 'When the network splits, you choose C or A' },
            { id: uid(), name: 'CP System', content: 'Consistency wins — write fails, data stays correct' },
          ],
        },
        {
          id: uid(),
          name: 'Trade-off visualised',
          frames: [
            { id: uid(), name: 'The Axis', content: 'Consistency ↑ vs Availability ↑' },
            { id: uid(), name: 'CP Example', content: 'HBase, MongoDB (pre-4.0), Zookeeper' },
            { id: uid(), name: 'AP Example', content: 'Cassandra, DynamoDB, CouchDB' },
          ],
        },
      ],
    },
    {
      id: uid(),
      name: 'CI/CD Pipeline Explained',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      scenes: [
        {
          id: uid(),
          name: 'Pipeline stages',
          frames: [
            { id: uid(), name: 'Lint', content: 'Static analysis · ESLint, Prettier, ShellCheck' },
            { id: uid(), name: 'Test', content: 'Unit + Integration · Jest, Pytest, Go test' },
            { id: uid(), name: 'Build', content: 'Container build · Docker, Buildpacks, Nix' },
            { id: uid(), name: 'Deploy', content: 'Canary → Stable · ArgoCD, Spinnaker, Flux' },
          ],
        },
      ],
    },
  ];
}

let _activeProjectId = $state<string | null>(null);
let _activeSceneId = $state<string | null>(null);

export const projectStore = {
  get projects(): Project[] {
    return _projects;
  },
  get activeProject(): Project | undefined {
    return _projects.find(p => p.id === _activeProjectId);
  },
  get activeScene(): Scene | undefined {
    return this.activeProject?.scenes.find(s => s.id === _activeSceneId);
  },

  selectProject(id: string) {
    _activeProjectId = id;
    _activeSceneId = null;
  },
  selectScene(id: string) {
    _activeSceneId = id;
  },

  createProject(name: string): Project {
    const p: Project = { id: uid(), name, createdAt: new Date().toISOString(), scenes: [] };
    _projects = [..._projects, p];
    return p;
  },
  deleteProject(id: string) {
    _projects = _projects.filter(p => p.id !== id);
    if (_activeProjectId === id) _activeProjectId = null;
  },

  addScene(projectId: string, name: string): Scene {
    const s: Scene = { id: uid(), name, frames: [] };
    _projects = _projects.map(p => p.id === projectId ? { ...p, scenes: [...p.scenes, s] } : p);
    return s;
  },
  deleteScene(projectId: string, sceneId: string) {
    _projects = _projects.map(p =>
      p.id === projectId ? { ...p, scenes: p.scenes.filter(s => s.id !== sceneId) } : p
    );
  },

  addFrame(projectId: string, sceneId: string, name: string): Frame {
    const f: Frame = { id: uid(), name, content: '' };
    _projects = _projects.map(p => p.id === projectId ? {
      ...p,
      scenes: p.scenes.map(s => s.id === sceneId ? { ...s, frames: [...s.frames, f] } : s),
    } : p);
    return f;
  },
  deleteFrame(projectId: string, sceneId: string, frameId: string) {
    _projects = _projects.map(p => p.id === projectId ? {
      ...p,
      scenes: p.scenes.map(s => s.id === sceneId ? {
        ...s,
        frames: s.frames.filter(f => f.id !== frameId),
      } : s),
    } : p);
  },
};
