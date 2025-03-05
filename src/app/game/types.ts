export enum Item {
    None,
    Dollar,
    
    Companion,
    Cow,
    
    Tool,
    Spoon,
    Knife,
    Shovel,
    
    Farm,

    Crop,
    Wheat,
    Lettuce,
    Coffee,

    Work,
    Build,
    Level,
}

export type GameState = {
    resources: Map<number, number>, // resource, qty
    resourceProgress: Map<number, number>, // resource, progress
    taskProgress: Map<number, number>, // task, progress
    maxTasks: number,
};
export type State = GameState;

export type GameStateUpdate = (gs:GameState) => void;
export type Update = GameStateUpdate;
