import * as Types from "@/app/game/types"
import {Item, State, Update} from "@/app/game/types"
import * as Data from "game/data"




/******************************/
// Other Views


/******************************/

export const resolveClick = (item: Item):Update => (gs: State) => {
    // const outcome = clickOutcomes.get(item); // or sth like that
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
