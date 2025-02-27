'use client'

import React from "react"
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";
enableMapSet(); // immer setup call, to make Maps and Sets work

import styles from "css/game.module.css"
import Grid from "UI/Grid"
import * as Types from "game/gameTypes"
import * as Data from "game/gameData"
import * as Game from "game/game"
import {initialGameState} from "game/gameState"

const resource1:Types.Resource = {
    id:1,
    name:"Foo",
}

const tick:number = 50; // ms

const GameMain = () => {
    const [GS, setGS] = useImmer<Types.GameState>(initialGameState);
    const [doProcessInterval, setDoProcessInterval] = React.useState<boolean>(false);
    const intervalId = React.useRef<number>(0);
    const lastUpdate = React.useRef<number>(Date.now());

    if (doProcessInterval) {
        setDoProcessInterval(false);
        const time:number = Date.now();
        const delta = time - lastUpdate.current; // in ms
        lastUpdate.current = time;
        const update:Types.GameStateUpdate = Game.gameLoop(delta);
        if (update)
            setGS(update);
    }

    React.useEffect(() => {
        intervalId.current = window.setInterval(() => setDoProcessInterval(true),
            tick);
        return () => {
            window.clearInterval(intervalId.current);
        };
    }, [setGS, setDoProcessInterval]);

    //console.log(GS.resources.get("Dollar"))
    return (
        <div className={styles.game}>
            <div className={styles.gridResources}>
                <Grid section={1} clickCallback={(name:string) => setGS(Game.click(name, Types.ItemType.Resource))}
                      elements = {[
                        {resource: Data.resourceMap.get("Dollar"), n:GS.resources.get("Dollar"), progress:0},
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
                      clickCallback={(name:string) => setGS(Game.click(name, Types.ItemType.Task))}
                      elements = {[
                        {task: Data.tasksMap.get("Job"),
                         progress: (GS.ongoingTasks.get("Job")?.time || 0) / (Data.tasksMap.get("Job")?.duration as number)},
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
