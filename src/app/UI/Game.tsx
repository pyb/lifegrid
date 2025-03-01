'use client'

import React from "react"
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";
enableMapSet(); // immer setup call, to make Maps and Sets work

import styles from "css/game.module.css"
import * as Types from "@/app/game/types"
import * as Data from "game/data"

const Main = () => {
    const [GS, setGS] = useImmer<Types.GameState>(Data.initialGameState);

    return (
        <div>
            {JSON.stringify(GS)}
        </div>
    )
}

export default Main;
