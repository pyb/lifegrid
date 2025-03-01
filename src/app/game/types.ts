export enum Resource {
    Dollar,
    Companion,
    Tool,
    Farm,
    Crop,
}

export enum Task {
    Work,
    Build,
    Level,
}

export type Item = Resource | Task;

export type R = Resource;
export type T = Task;

export type ResourceInfo = {
    n: number,
    active: boolean,
    progress: number, // in %
    velocity: number, // in % / ms
};

export type TaskInfo = {
    active: boolean,
    progress: number, // in %
    velocity: number, // in % / ms
    level?: number, // maybe use this
};

export type ResourceCost = Array<[Resource, number]>;

export type GameState = {
    resources: Map<Resource, ResourceInfo>,
    ongoing: {
        tasks: Array<TaskInfo>,
        resources: Array<ResourceInfo>
    },
    clicked: Array<Item>; // all that was clicked within the last tick
};
export type State = GameState;

export type GameStateUpdate = (gs:GameState) => void;
export type Update = GameStateUpdate;
