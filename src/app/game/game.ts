import * as Types from "@/app/game/types"
import {Item, Resource, Task, R, T, ResourceInfo, State, Update, Rates} from "@/app/game/types"
import * as Data from "game/data"




/******************************/
// Other Views


/******************************/

const resolveClick = (item: Item):Update => (gs: State) => {
    // const outcome = clickOutcomes.get(item); // or sth like that
}



const gameLoop = (delta:number):Update => (gs: State) => {
    // Generation

    for (const [resource, rate] of Data.resolveBuild(gs.resources).resourceGeneration) {
        const gain = rate * delta;
        const info =  <ResourceInfo>gs.resources.get(resource);
        info.n += gain; // TODO : will n be writable?
    }

    // Handle Clicks here?

}
