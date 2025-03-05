import * as Types from "@/app/game/types"
import {Item, State, Update} from "@/app/game/types"
import * as Data from "game/data"

/******************************/

const isTask = (item:number):boolean => Data.tasks.has(item);


const levelUp:Update = (gs:State)=> {
    gs.taskProgress.delete(Item.Level); // should happen elsewhere
    gs.level++;
    gs.taskProgress.set(Item.Level, 0); // start the next one
    // todo : level up resources
} 

const build:Update = (gs:State) => {
    gs.taskProgress.delete(Item.Build); // should happen elsewhere
    const toolType:number = gs.tool;
    const tool = <number>gs.resources.get(toolType);
    gs.resources.set(toolType, tool + 1);
}

const work:Update = (gs:State) => {
    gs.taskProgress.delete(Item.Work); // should happen elsewhere
    const dollar = <number>gs.resources.get(Item.Dollar);
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

const taskClick = (gs: State, item: number): void => {
    if (gs.taskProgress.size >= gs.maxTasks ||
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

const resourceClick = (gs: State, item: number):void => {
    if (gs.resourceProgress.has(item))
        return;
    const costs = Data.resourcePrices.get(item);
    if (!costs)
        return;
    for (const [resource, cost] of costs) {
        const r = <number>gs.resources.get(resource);
        if (r < cost)
            return;
    }
    for (const [resource, cost] of costs) {
        const r = <number>gs.resources.get(resource);
        gs.resources.set(resource, r - cost);
    }
    gs.resourceProgress.set(item, 0);
}

let lastUpdate:number = Date.now();
let lastClicked:number = Types.Item.None;

export const onClick = (item: number) => {
    if (lastClicked == Types.Item.None) {
        lastClicked = item;
    }
}

export const gameLoop:Update = (gs:State) => {
    const time: number = Date.now();
    const delta = time - lastUpdate; // in ms
    lastUpdate = time;
    
    const clicked:number = lastClicked;
    lastClicked = Types.Item.None;
    if (isTask(clicked))
        taskClick(gs, clicked);
    else
        resourceClick(gs, clicked);

    // Task progress + completion
    const rates: Map<number, number> = Data.taskSpeeds(gs);
    Data.tasks.forEach((task: number) => {
        let progress = <number>gs.taskProgress.get(task) + delta * <number>rates.get(task);
        if (progress > Data.taskGoal) {
            gs.taskProgress.delete(task);
            const update:Update = completeTask(task);
            update(gs);
        }
        else {
            gs.taskProgress.set(task, progress);
        }
    });

    // Resource progress + completion
  
    

    // Resource Generation
    gs.resources.forEach((n:number, resource: number) => {
        const rate:number = Data.growthRate(resource, gs);
        if (!isNaN(rate)) {
            gs.resources.set(resource, n + delta * rate);
        }
    });

    // Phase 2: Task Autoclick 
}
