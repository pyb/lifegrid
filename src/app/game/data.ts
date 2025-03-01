import * as Types from "@/app/game/types"
import {Resource, ResourceInfo, TaskInfo} from "@/app/game/types"



export const initialGameState:Types.GameState = {
    resources: new Map<Resource, ResourceInfo>(),
    ongoing: {
        tasks: [],
        resources: [],
    },
    clicked: [],
}