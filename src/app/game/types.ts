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
    Potato,
    Wheat,
    Lettuce,
    Coffee,

    Work,
    Build,
    Level,
}

export type State = {
    resources: Map<number, number>, // resource, qty
    resourceProgress: Map<number, number>, // resource, progress
    taskProgress: Map<number, number>, // task, progress
    maxTasks: number,
    sellCrop : boolean,
    toolLevel: number,
    level: number,
    crop: number,
    tool: number,
};

export type Update = (gs:State) => void;

