// Grid item
import styles from "css/item.module.css"

interface ItemProps {
    progress?: number,
    name?: string
}

const color1: string = "rgb(218, 135, 135) ";
const color2: string = "rgb(36, 169, 109) ";

const backgroundProp = (progress:number) => { return {
    background: "linear-gradient(to top, " + color1 + " 0 " + (progress*100).toString()
     + "%, " + color2 + " " + (progress*100).toString() + "% " + ((1-progress)*100).toString() +  "%)"
}}

const Item = ({progress, name}:ItemProps) => {
    return(
        <div className={styles.item} style={progress ? backgroundProp(progress): {}}>
            <div className={styles.name}>
                {name || "Item"}
            </div>
        </div>
    );
}

export default Item;
