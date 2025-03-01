import * as Types from "@/app/game/types"
import {Item, Resource, Task, R, T, ResourceCost, ResourceInfo, State, Update} from "@/app/game/types"




/***********************/
// Cost model. Belongs to Data?
const farmCost = (gs:State):ResourceCost => {
    return [];
}

const companionCost = (type:string, gs:State):ResourceCost  => { // Type won't be string in the future? CompanionType?
    return [];
}

// return generation rate for each resource
const resourceGen = (gs:State):Array<[Resource, number]> => {
    return [];
}

/******************************/
// Other Views


/******************************/

const resolveClick = (item: Item):Update => (gs: State) => {
    // const outcome = clickOutcomes.get(item); // or sth like that
}


const gameLoop = (delta:number):Update => (gs: State) => {
    // Generation
    const resourcesGained:Array<[Resource, number]> = resourceGen(gs).map(
        ([resource, rate]:[Resource, number]) => [resource, rate * delta]); // TODO : check units
    for (const [resource, gain] of resourcesGained) {
        const info =  <ResourceInfo>gs.resources.get(resource);
        info.n += gain; // TODO : will n be writable?
    }

    // Handle Clicks here?

}
