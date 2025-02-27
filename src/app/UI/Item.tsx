// Grid item
import styles from "css/grid.module.css"

interface ItemProps {
    progress?: number,
    name?: string,
    n?: number,
    hoverText: string,
    clickCallback? : () => void,
}

const color1: string = "rgb(69, 69, 69) ";
const color2: string = "rgb(24, 34, 29) ";

const backgroundProp = (progress:number) => { return {
    background: "linear-gradient(to top, " + color1 + " 0 " + (progress*100).toString()
     + "%, " + color2 + " " + (progress*100).toString() + "% " + ((1-progress)*100).toString() +  "%)"
}}

const Item = ({progress, name, n, hoverText, clickCallback}:ItemProps) => {
    return(
        <div className={styles.item} onClick={clickCallback}
                                     style={progress ? backgroundProp(progress): {}}>
            <div className={styles.name}>
                {name}
            </div>
            {n &&
            <div className={styles.value}>
                {n > 0 ? n.toString() :"?"}
            </div>
            }
            {hoverText && <span className={styles.tooltiptext}>{hoverText}</span>}
        </div>
    );
}

export default Item;
