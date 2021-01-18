const Chip = ({name,color})=>{
    return(
        <div className="chip" style={{backgroundColor:color}}>
            <p>{name}</p>
        </div>
    )
}
export default Chip