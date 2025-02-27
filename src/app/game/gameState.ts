import * as Types from "game/gameTypes"

export const initialGameState:Types.GameState = {
    ongoingTasks: new Map<string, Types.TaskInfo>(),
    resources: new Map<string, number>(),
}
