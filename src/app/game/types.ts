export enum Item {
    None,
    
    Work,
    Build,
    Level,

    Dollar,
    
    Farm,

    Companion,
    Cow,
    Sheep,
    Collie,
    Retriever,
    
    // Level 1
    Spoon,
    Knife,
    Shovel,
    Hammer,
    // Level 2
    Drill,
    Grinder,
    Bulldozer,
    

    Crop,
    Potato,
    Wheat,
    Lettuce,
    Coffee,   
}

export type ResourceCost = {
    resource: number,
    cost: number,
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

