'use client'

import React from "react"
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";
enableMapSet(); // immer setup call, to make Maps and Sets work

import styles from "css/game.module.css"
import * as Types from "@/app/game/types"
import * as Data from "game/data"
import Grid from "UI/Grid"

const Main = () => {
    const [GS, setGS] = useImmer<Types.GameState>(Data.initialGameState);

    const onClick = (item:number) => {
        console.log("clicked " + item.toString())
    }

    return (
        <div className={styles.gameMain}>
            <Grid side={0} gs={GS} onClick={onClick}/>
            <Grid side={1} gs={GS} onClick={onClick}/>
        </div>
    )
}

export default Main;
