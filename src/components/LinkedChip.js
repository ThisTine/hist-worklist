import { Link } from "react-router-dom"

const LinkedChip = ({name,color,sub})=>{
    return(
        <Link className="linkedchip" to={`${sub}`} style={{textDecoration:"none"}}>
        <div className="chip" style={{backgroundColor:color}}>
            <p>{name}</p>
        </div>
        </Link>
    )
}
export default LinkedChip