import * as Types from "@/app/game/types"
import {Resource, ResourceInfo} from "@/app/game/types"

// production
// 

export const initialGameState:Types.GameState = {
    resources: new Map<Resource, ResourceInfo>(),
}