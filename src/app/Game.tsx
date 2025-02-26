'use client'

import styles from "css/game.module.css"
import Grid from "UI/Grid"
import Item from "UI/Item"
import * as Types from "game/gameTypes"

const clickCallbackLeft = (id:number):void => {
    console.log("clickLeft : " + id.toString());
}

const clickCallbackRight = (id:number):void => {
    console.log("clickRight " + id.toString());
}

const resource1:Types.Resource = {
    id:1,
    name:"Foo",
}
const Game = () => {
    return (
        <div className={styles.game}>
            <div className={styles.gridLeft}>
                <Grid section={1} clickCallback={clickCallbackLeft}
                      elements = {[
                        {resource: resource1, progress:0.3},
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
            <div className={styles.gridRight}>
                <Grid section={2}
                      clickCallback={clickCallbackRight}
                      elements = {[
                        {resource: resource1, progress:0.3},
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

export default Game;
