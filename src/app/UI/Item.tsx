// Grid item
import styles from "css/item.module.css"

interface ItemProps {
    progress?: number,
    name?: string,
    id?: number,
    n?: number,
    clickCallback? : () => void,
}

const color1: string = "rgb(69, 69, 69) ";
const color2: string = "rgb(24, 34, 29) ";

const backgroundProp = (progress:number) => { return {
    background: "linear-gradient(to top, " + color1 + " 0 " + (progress*100).toString()
     + "%, " + color2 + " " + (progress*100).toString() + "% " + ((1-progress)*100).toString() +  "%)"
}}

const Item = ({progress, name, id, n, clickCallback}:ItemProps) => {
    return(
        <div className={styles.item} onClick={clickCallback}
                                     style={progress ? backgroundProp(progress): {}}>
            <div className={styles.name}>
                {name || (id ? ("Item " + id.toString()) : "Item")}
            </div>
            {n &&
            <div className={styles.value}>
                {n > 0 ? n.toString() :"?"}
            </div>
            }
        </div>
    );
}

export default Item;
