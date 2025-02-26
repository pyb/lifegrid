'use client'

import styles from "css/game.module.css"
import Grid from "UI/Grid"
import Item from "UI/Item"
import * as Types from "game/gameTypes"
import * as Data from "game/gameData"
import * as Game from "game/game"

const resource1:Types.Resource = {
    id:1,
    name:"Foo",
}
const GameMain = () => {
    return (
        <div className={styles.game}>
            <div className={styles.gridResources}>
                <Grid section={1} clickCallback={(name:string) => Game.click(name, Types.ItemType.Resource)}
                      elements = {[
                        {resource: resource1, n:1, progress:0.3},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {}
                      ]}>
                </Grid>
            </div>
            <div className={styles.gridTasks}>
                <Grid section={2}
                      clickCallback={(name:string) => Game.click(name, Types.ItemType.Task)}
                      elements = {[
                        {task: Data.tasksMap.get("Job"), progress:0.3},
                        {},
                        {},
                        {},
                        {},
                        {},
                      ]}>
                </Grid>
            </div> 
        </div>
    );
}

export default GameMain;
