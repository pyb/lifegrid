import * as Types from "@/app/game/types"
import {Item, State} from "@/app/game/types"


/***********************/
// Cost model.
/*
export const farmCost = (gs:State):ResourceCosts => {
    return [];
}

export const companionCost = (type:string, gs:State):ResourceCosts  => { // Type won't be string in the future? CompanionType?
    return [];
}

// return generation rate for each resource
export const resourceGen = (gs:State):Array<[Resource, number]> => {
    return [];
}
*/



/*



*/

/*
Notes reminder:

Cow makes farm quicker
Farm produces cow (manual click)

Farm costs $ and generate $

Farm + tool makes coffee continuously. Rate depends on farms and Tool (multiplier?).
 [ eg : const coffeeRate = (gs) => A*gs.farms * (B +C * toolboost(gs.toolLevel)); or sth. Does toolboost depend on farms ? (ie superlinear?) it it an exponent? farms^toolboostexponent(toolLevel)? ]

Coffee makes tasks faster (formula : coffee level vs task?). sublinear "task speed vs coffee" ? log or sqrt formula? 

Tool slot has a tool with a n/100 progress counter, increased by Build task [rename it? Upgrade task?]
-> line of tools for each level

Farms are central and accumulating them should be satisfying... (inc. icons?)

Job creates $
Farm creates
Build creates

*/

const defaultInitialLevelVelocity = 0.00000001;
const initialLevelVelocities:Array<number> = [0.0001, 0.000001, 0.00001];

const nTasks = (n: number, cropType:number):number => {
    return 1;
}

/*
    How to record resource costs.
    eg a farm is n dollars or m dollar + 1 cow.
    I/O
    [[I.Dollar, 100] [I.Cow, 1]]
*/

/*
const resourceCosts:Array<ResourceCost> = [
    {input: [[Item.Dollar, 100], [Item.Cow,1]], output:[Item.Farm, 1]},
    
];

export const resolveBuild = (build: Map<number, ResourceInfo>):Rates => {
    const result:Rates = {
        resourceCosts: new Map<number, Array<[number, number]>>(),
        taskProduction: new Map<number, Array<[number, number]>>(),
        nTasks: nTasks(build.get(Item.Crop)?.n as number, Item.Coffee),
        taskVelocity: new Map<number, number>(),
        resourceGeneration: new Map<number, number>(),
    }
    return result;
}
*/

/*****************************************/

export const tick = 50;

export const initialGameState:Types.GameState = {
    //resources: new Map<number, ResourceInfo>(),
    resources: new Map<number, number>()
    /*
    ongoing: {
        tasks: [{task: Item.Level, active:true, progress: 0}],
        resources: new Map<number, ResourceInfo>(),
    },
    */
}