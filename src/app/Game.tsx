import styles from "css/game.module.css"
import Grid from "UI/Grid"
import Item from "UI/Item"

const Game = () => {
    return (
        <div className={styles.game}>
            <div className={styles.gridLeft}>
                <Grid section={1}>
                    <Item key={0} />
                    <Item key={1} />
                    <Item key={2} />
                    <Item key={3} />
                    <Item key={4} />
                    <Item key={5} />
                    <Item key={6} />
                    <Item key={7} />
                    <Item key={8} />
                </Grid>
            </div>
            <div className={styles.gridRight}>
                <Grid section={2}>
                    <Item key={0} />
                    <Item key={1} />
                    <Item key={2} />
                    <Item key={3} />
                    <Item key={4} />
                    <Item key={5} />
                </Grid>
            </div> 
        </div>
    );
}

export default Game;
