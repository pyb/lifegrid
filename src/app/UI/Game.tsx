'use client'

import React from "react"
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";
enableMapSet(); // immer setup call, to make Maps and Sets work

import styles from "css/game.module.css"
import * as Types from "@/app/game/types"
import * as Data from "game/data"
import * as Game from "game/game"
import Grid from "UI/Grid"

const Main = () => {
    const [GS, setGS] = useImmer<Types.GameState>(Data.initialGameState);
    const [doProcessInterval, setDoProcessInterval] = React.useState<boolean>(false);
    const lastClicked = React.useRef<number>(Types.Item.None); // ref bc we only process this every tick
    const intervalId = React.useRef<number>(0);
    const lastUpdate = React.useRef<number>(Date.now());

    if (doProcessInterval) {
        setDoProcessInterval(false);
        const time:number = Date.now();
        const delta = time - lastUpdate.current; // in ms
        lastUpdate.current = time;
        let update:Types.GameStateUpdate = Game.gameLoop(delta);
        if (update)
            setGS(update);
        update = Game.resolveClick(lastClicked.current);
        if (update)
            setGS(update);
        lastClicked.current = Types.Item.None;
    }

    const onClick = (item:number) => {
        if (lastClicked.current == Types.Item.None) {
            lastClicked.current = item;
        }
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
            <Grid side={0} gs={GS} onClick={onClick}/>
            <Grid side={1} gs={GS} onClick={onClick}/>
        </div>
    )
}

export default Main;
