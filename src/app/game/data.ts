import * as Types from "@/app/game/types"
import {Item, State, Update, ResourceCost} from "@/app/game/types"

// Put everything purely numerical in Params object?

export const resourcePrices = new Map<number, Array<[number, number]>>([
    [Item.Farm, [[Item.Dollar, 1000]]],
]);

export const tasks = new Set<number>([Item.Build, Item.Level, Item.Work]);
export const tools = new Set<number>([Item.Spoon, Item.Knife, Item.Shovel]);
export const crops = new Set<number>([Item.Lettuce, Item.Wheat, Item.Coffee]);
export const companions = new Set<number>([Item.Cow, Item.Retriever, Item.Collie, Item.Sheep]);

const defaultInitialLevelVelocity = 0.0001;
const initialLevelVelocities:Array<number> = [0.3, 0.01, 0.003];

const nTasks = (gs:State):number => {
    return 1;
}

export const taskGoal = 100;

const levelFarmFactor = 1;
const sellCropRate = .1;

export const cropDollarConversion = new Map<number, number> ([
    [Item.Potato, 1],
    [Item.Lettuce, 2],
    [Item.Wheat, 4],
    [Item.Coffee, 8],
]);

export const growthRate = (item:number, gs:State):number => {
    let rate:number = NaN;
    const farms = <number>gs.resources.get(Item.Farm);

    if (item == Item.Dollar)
    {
        if (gs.sellCrop)
        {
            rate = sellCropRate * <number>cropDollarConversion.get(item);
        }
    }
    else if (crops.has(item))
    {
        // Crop-independent rate for now
        // Crop rate = A * Farm ^ (B * ToolLevel). Try A = 1
        // or maybe A * Farm ^ (B * ToolLevel * log(Farm) / C(Level) )
        const A = .1;
        const B = 1;
        const C = gs.level; // level-dependent constant TBD
        rate = A * (farms ^ ( B* gs.toolLevel * Math.log(farms) / C)); 
        if (gs.sellCrop)
        {
            rate -= sellCropRate;        
        }
    }
    else {
        // no resource generation
    }
    return rate;
}

export const workReturn = 100;

// reminder : task completion goal is 100
export const taskSpeed = (task:number, gs:State):number => {
    let speed:number = NaN;
    switch (task) {
        case Item.Work:
            speed = 25;
            break;
        case Item.Build:
            // design choice : constant for now.
            // Maybe divide by (2^(toolLevel-1)) later on ?
            speed = 15;
            break;
        case Item.Level:
            // What factors influence this? Farms. (and maybe cows, or sth else but that's not currently the intention)
            speed = (initialLevelVelocities[gs.level] || defaultInitialLevelVelocity)
                    + levelFarmFactor * <number>gs.resources.get(Item.Farm);
            break;
        default:
            throw new Error("Bug : task " + task.toString() + " unknown.");
    }
    return speed;
}

const farmCost:ResourceCost = {
        resource: Item.Dollar,
        cost: 1000
    };

const companionCost = new Map<number, ResourceCost>([
    [Item.Cow,
    {
        resource: Item.Wheat, 
        cost: 1000
    }],
    [Item.Collie,
    {
        resource: Item.Potato, 
        cost: 1000
    }],
]);

export const toolGoal = 10;

export const resourceCosts = (resource:number):ResourceCost|undefined => {
    let cost:ResourceCost;
    if (resource == Item.Farm)
    {
        cost = farmCost;
    }
    else if (companions.has(resource)) {
        cost = <ResourceCost>companionCost.get(resource);
    }
    else {
        return undefined;
    }
    return cost;
}

export const tick = 50;

export const initialGameState:Types.State = {
    //resources: new Map<number, ResourceInfo>(),
    resources: new Map<number, number>(),
    resourceProgress : new Map<number, number>(),
    taskProgress : new Map<number, number>(),
    crop: Item.Potato,
    tool: Item.Spoon,
    maxTasks: 1,
    toolLevel: 1,
    level: 1,
    sellCrop: false,
    /*
    ongoing: {
        tasks: [{task: Item.Level, active:true, progress: 0}],
        resources: new Map<number, ResourceInfo>(),
    },
    */
}