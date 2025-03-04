export enum Item {
    Dollar,
    
    Companion,
    Cow,
    
    Tool,
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
    resources: Map<number, number>,
};
export type State = GameState;

export type GameStateUpdate = (gs:GameState) => void;
export type Update = GameStateUpdate;
