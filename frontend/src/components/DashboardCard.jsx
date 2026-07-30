function DashboardCard({
title,
value,
icon
}){


return(

<div className="bg-white rounded-xl shadow p-6">


<div className="text-3xl">
{icon}
</div>


<p className="text-gray-500 mt-3">
{title}
</p>


<h2 className="text-3xl font-bold mt-2">
{value}
</h2>


</div>

)

}


export default DashboardCard;