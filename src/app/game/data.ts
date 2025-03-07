import * as Types from "@/app/game/types"
import {Item, State, Update, ResourceCost} from "@/app/game/types"

// Put everything purely numerical in Params object?

export const tasks = new Set<number>([Item.Build, Item.Level, Item.Work]);
export const tools = new Set<number>([Item.Spoon, Item.Knife, Item.Shovel]);
export const crops = new Set<number>([Item.Potato, Item.Lettuce, Item.Wheat, Item.Coffee]);
export const companions = new Set<number>([Item.Cow, Item.Retriever, Item.Collie, Item.Sheep]);

export const itemNames = new Map<number, string> ([
    [Item.Build, "Build"],
    [Item.Level, "Level"],
    [Item.Work, "Work"],

    [Item.Dollar, "$"],
    [Item.Farm, "Farm"],

    [Item.Spoon, "Spoon"],
    [Item.Knife, "Knife"],
    [Item.Shovel, "Shovel"],

    [Item.Potato, "Potato"],
    [Item.Lettuce, "Lettuce"],
    [Item.Wheat, "Wheat"],
    [Item.Coffee, "Coffee"],

    [Item.Cow, "Cow"],
    [Item.Retriever, "Golden Retriever"],
    [Item.Collie, "Border Collie"],
    [Item.Sheep, "Sheep"],
]);

const initialTool = Item.Spoon;
const initialCrop = Item.Potato;
const initialCompanion = Item.Cow;

const defaultInitialLevelVelocity = 0.00001;
//const initialLevelVelocities:Array<number> = [0.0005, 0.000001, 0.000003];
const initialLevelVelocities:Array<number> = [0.005, 0.000001, 0.000003]; // testing

const nTasks = (gs:State):number => {
    return 1;
}

export const taskGoal = 100;

const levelFarmFactor = 1;
const sellCropRate = .01;
export const minCropForSelling = 5;

export const cropDollarConversion = new Map<number, number> ([
    [Item.Potato, .2],
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
            rate = sellCropRate * <number>cropDollarConversion.get(gs.crop);
            console.log(rate)
        }
    }
    else if (crops.has(item))
    {
        // Crop-independent rate for now
        // Crop rate = A * Farm ^ (B * ToolLevel). Try A = 1
        // or maybe A * Farm ^ (B * ToolLevel * log(Farm) / C(Level) )
        const A = .001;
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

export const workReturn = 10;

// reminder : task completion goal is 100
export const taskSpeeds = (gs:State):Map<number, number> => {
    const result = new Map<number, number>();
    let task:number;
    let speed:number;

    task = Item.Work;
    speed = 150;
    //speed = 500; // for testing
    result.set(task, speed);

    task = Item.Build;
    //speed = 20;
    speed = 200; // for testing
    result.set(task, speed);

    task = Item.Level;
    // What factors influence this? Farms. (and maybe cows, or sth else but that's not currently the intention)
    speed = (initialLevelVelocities[gs.level - 1] || defaultInitialLevelVelocity)
            * levelFarmFactor * Math.sqrt(gs.resources.get(Item.Farm) || 0);
    result.set(task, speed);
    
    return result;
}

const farmCost:ResourceCost = {
        resource: Item.Dollar,
        cost: 200,
    };

const companionCost = new Map<number, ResourceCost>([
    [Item.Cow,
    {
        resource: Item.Potato, 
        //cost: 1000,
        cost: 200, // for testing
    }],
    [Item.Collie,
    {
        resource: Item.Wheat, 
        //cost: 1000
        cost: 200, // for testing
    }],
]);

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

/*
export const resourcePrices = new Map<number, Array<[number, number]>>([
    [Item.Farm, [[Item.Dollar, 200]]],
]);
*/

export const toolGoal = 10;

export const tick = 50;

export const initialGameState:Types.State = {
    resources: new Map<number, number>([[Item.Dollar, 0], [Item.Farm, 0], [initialTool, 0], [initialCrop, 0], [initialCompanion, 0] ]),
    resourceProgress : new Map<number, number>(),
    taskProgress : new Map<number, number>([[Item.Level, 0]]),
    crop: Item.Potato,
    tool: Item.Spoon,
    maxTasks: 2,
    toolLevel: 1,
    level: 1,
    sellCrop: false,
}