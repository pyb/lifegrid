import * as Types from "game/gameTypes"

const initialResources = new Map<string, number>(); // how much of each we have
initialResources.set("Dollar", 0);
initialResources.set("Cow", 0);
initialResources.set("House", 0);
initialResources.set("Farm", 0);

export const initialGameState:Types.GameState = {
    ongoingTasks: new Map<string, Types.TaskInfo>(),
    resources: initialResources,
}
