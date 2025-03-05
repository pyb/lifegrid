import * as Types from "@/app/game/types"
import {Item, State} from "@/app/game/types"

// Put everything purely numerical in Params object?

export const resourcePrices = new Map<number, Array<[number, number]>>([
    [Item.Farm, [[Item.Dollar, 1000]]],
]);

export const tasks = new Set<number>([Item.Build, Item.Level, Item.Work]);
export const tools = new Set<number>([Item.Spoon, Item.Knife, Item.Shovel]);
export const crops = new Set<number>([Item.Lettuce, Item.Wheat, Item.Coffee]);

const defaultInitialLevelVelocity = 0.00000001;
const initialLevelVelocities:Array<number> = [0.0001, 0.000001, 0.00001];

const nTasks = (gs:State):number => {
    return 1;
}

export const taskGoal = 100;

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
    else if (item == Item.Level)
    {
        rate = initialLevelVelocities[gs.level] || defaultInitialLevelVelocity;
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

export const workReturn = (gs:State):number => {
    return 100;
}

export const taskSpeed = (task:number, gs:State):number => {
    let duration:number = NaN;
    switch (task) {
        case Item.Work:
            duration = 5;
            break;
        case Item.Build:
            // design choice : constant for now.
            // Maybe divide by (2^(toolLevel-1)) later on ?
            duration = 4;
            break;
        case Item.Level:
            duration = 1000;
            break;
        default:
            throw new Error("Bug : task " + task.toString() + " unknown.");
    }
    return duration;
}

const farmCost = 1000;

export const toolGoal = 10;

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