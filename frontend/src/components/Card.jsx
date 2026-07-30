function Card({title,value,icon}){

return(

<div className="card">

<h3>{icon} {title}</h3>

<h2>
₹ {value}
</h2>

</div>

)

}

export default Card;