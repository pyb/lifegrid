import * as Types from "@/app/game/types"
import {Item, State, Update} from "@/app/game/types"
import * as Data from "game/data"

/******************************/

const isTask = (item:number):boolean => Data.tasks.has(item);


const levelUp:Update = (gs:State) => {
    gs.taskProgress.delete(Item.Level); // should happen elsewhere
    gs.level++;
    // todo

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

const taskClick = (item:number):Update => {
    return (gs:State) => {
        if (gs.taskProgress.size >= gs.maxTasks ||
            gs.taskProgress.has(item) )
            return;

        switch(item) {
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
}

const resourceClick = (item:number):Update => {
    return (gs:State) => {
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
}

export const resolveClick = (item:Item):Update => {
    return isTask(item) ? taskClick(item) : resourceClick(item);
}

export const gameLoop = (delta:number):Update => (gs: State) => {
    // Resource Generation
    // Task, resource progress
    // Task Autoclick
    /*
    for (const [resource, rate] of Data.resolveBuild(gs.resources).resourceGeneration) {
        const gain = rate * delta;
        // increase resource
    }

    */

}
