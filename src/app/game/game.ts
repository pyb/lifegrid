import * as Types from "@/app/game/types"
import {Item, State, Update, ResourceCost} from "@/app/game/types"
import * as Data from "game/data"

/******************************/

const isTask = (item:number):boolean => Data.tasks.has(item);


const levelUp:Update = (gs:State)=> {
    gs.taskProgress.delete(Item.Level); // should happen elsewhere
    gs.level++;
    gs.taskProgress.set(Item.Level, 0); // start the next one
    console.log("Level up : " + gs.level.toString())
    // todo : level up resources
} 

const build:Update = (gs:State) => {
    gs.taskProgress.delete(Item.Build); // should happen elsewhere
    const toolType:number = gs.tool;
    const tool = <number>gs.resources.get(toolType) || 0;
    console.log(tool)
    gs.resources.set(toolType, tool + 1);
}

const work:Update = (gs:State) => {
    gs.taskProgress.delete(Item.Work); // should happen elsewhere
    const dollar = <number>gs.resources.get(Item.Dollar) || 0;
    gs.resources.set(Item.Dollar, dollar + Data.workReturn);
}

// Task outcome
const completeTask = (task:number):Update => {
    switch (task) {
        case Item.Work:
            return work;
            break;
        case Item.Build:
            return build;
            break;
        case Item.Level:
            return levelUp;
        default:
            throw new Error("Bug : task " + task.toString() + " does not exist !");
    }
}

const taskClick = (item: number):Update => (gs:State) => {
    if ((gs.taskProgress.size >= gs.maxTasks) ||
        gs.taskProgress.has(item))
        return;

    switch (item) {
        case Item.Level:
            break; // noop
        case Item.Work:
        case Item.Build:
            gs.taskProgress.set(item, 0);
            break;
        default:
            throw new Error("Bug : task " + item.toString() + " does not exist !");
    }
}

const resourceClick = (item: number): Update => (gs: State) => {
    /*
    if (gs.resourceProgress.has(item))
        return;
    gs.resourceProgress.set(item, 0);
    */
    if (Data.crops.has(item) && 
        (<number>gs.resources.get(item) > Data.minCropForSelling)) {
        gs.sellCrop = !gs.sellCrop;
    }

    const rCost = Data.resourceCosts(item);
    if (!rCost)
        return;
    const r = gs.resources.get(rCost.resource);
    
    if (r !== undefined && (r >= rCost.cost)) {
        const current: number = gs.resources.get(item) || 0;
        gs.resources.set(rCost.resource, r - rCost.cost);
        gs.resources.set(item, current + 1);
    }
}

let lastUpdate:number = Date.now();
let lastClicked:number = Types.Item.None;

export const onClick = (item: number) => {
    if (lastClicked == Types.Item.None) {
        lastClicked = item;
    }
}

export const progressTasks = (delta:number):Update => (gs:State) => {
   // Task progress + completion
   const rates: Map<number, number> = Data.taskSpeeds(gs);
   Data.tasks.forEach((task: number) => {
       if (gs.taskProgress.has(task))
       {
           let progress = <number>gs.taskProgress.get(task) + delta * .001 * <number>rates.get(task);
           if (progress > Data.taskGoal) {
               gs.taskProgress.delete(task);
               const update:Update = completeTask(task);
               update(gs);
           }
           else {
               gs.taskProgress.set(task, progress);
           }
       }
   });
}

export const generateResources = (delta:number):Update => (gs:State) => {
  // Resource Generation
  gs.resources.forEach((n:number, resource: number) => {
    const rate:number = Data.growthRate(resource, gs);
    if (!isNaN(rate)) {
        const newValue:number = Math.max(0,  n + delta * rate);
        gs.resources.set(resource, newValue);
        if (gs.sellCrop &&
            Data.crops.has(resource) && 
            newValue < 1)
            {
                gs.sellCrop = false;
            }
    }
  });
}

export const gameLoop = ():Array<Update> => {
    const result:Array<Update> = [];

    const time: number = Date.now();
    const delta = time - lastUpdate; // in ms
    lastUpdate = time;
    
    const clicked:number = lastClicked;
    if (clicked != Types.Item.None) {
        lastClicked = Types.Item.None;
        if (isTask(clicked))
            result.push(taskClick(clicked));
        else
            result.push(resourceClick(clicked));
    }
 
    result.push(progressTasks(delta));
    result.push(generateResources(delta));
    return result;
    // Phase 2:
    // Resource progress + completion

    // Phase 2:
    // Task Autoclick 
}
