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
    

    Tool,
    // Level 1
    Spoon,
    Knife,
    Shovel,
    // Level 2
    Drill,
    Bulldozer,

    Crop,
    Potato,
    Wheat,
    Lettuce,
    Coffee,   
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

