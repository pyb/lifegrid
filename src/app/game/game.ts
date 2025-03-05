import * as Types from "@/app/game/types"
import {Item, State, Update} from "@/app/game/types"
import * as Data from "game/data"

/******************************/

const isTask = (item:number):boolean => Data.tasks.has(item);

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
    // Generation

    /*
    for (const [resource, rate] of Data.resolveBuild(gs.resources).resourceGeneration) {
        const gain = rate * delta;
        // increase resource
    }

    */

}
