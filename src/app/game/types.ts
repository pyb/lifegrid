export enum Item {
    Dollar,
    
    Companion,
    Cow,
    
    Tool,
    Knife,
    Shovel,
    
    Farm,


    Crop,
    Lettuce,
    Coffee,


    Work,
    Build,
    Level,
}

export type ResourceCost = {
    input: Array<[number, number]>, // [item, n]
    output: [number, number],
}

export const I = Item;


export type ResourceInfo = {
    Resource: number,
    n: number,
    active: boolean,
    progress: number, // in %
};

export type TaskInfo = {
    task: number,
    active: boolean,
    progress: number, // in %
    level?: number, // maybe use this
};


export type Rates = {
    resourceCosts: Map<number, Array<[number, number]>>,
    taskProduction: Map<number, Array<[number, number]>>,
    nTasks: number,
    taskVelocity: Map<number, number>,
    resourceGeneration: Map<number, number>,
}

export type GameState = {
    resources: Map<number, ResourceInfo>,
    ongoing: {
        tasks: Array<TaskInfo>,
        resources: Map<number, ResourceInfo>,
    },
    clicked: Array<number>; // all that was clicked within the last tick
};
export type State = GameState;

export type GameStateUpdate = (gs:GameState) => void;
export type Update = GameStateUpdate;
