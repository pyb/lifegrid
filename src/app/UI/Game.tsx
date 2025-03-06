'use client'

import React from "react"
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";
enableMapSet(); // immer setup call, to make Maps and Sets work

import styles from "css/game.module.css"
import * as Types from "@/app/game/types"
import {Item, State, Update} from "@/app/game/types"
import * as Data from "game/data"
import * as Game from "game/game"
import Grid from "UI/Grid"

const Main = () => {
    const [GS, setGS] = useImmer<State>(Data.initialGameState);
    const [doProcessInterval, setDoProcessInterval] = React.useState<boolean>(false);
    const intervalId = React.useRef<number>(0);

    //console.log(GS.taskProgress.get(Item.Work))
    if (doProcessInterval) {
        setDoProcessInterval(false);
        const updates:Array<Update> = Game.gameLoop();
        for (const update of updates)
            setGS(update);
    }
    
    React.useEffect(() => {
        intervalId.current = window.setInterval(() => setDoProcessInterval(true),
            Data.tick);
        return () => {
            window.clearInterval(intervalId.current);
        };
    }, [setGS, setDoProcessInterval]);

    return (
        <div className={styles.gameMain}>
            <Grid side={0} gs={GS} onClick={Game.onClick}/>
            <Grid side={1} gs={GS} onClick={Game.onClick}/>
        </div>
    )
}

export default Main;
