import Image from "next/image";

export default function PlantCard({ plant }){

return(

<div className="
bg-white
rounded-xl
shadow-lg
p-5
hover:shadow-2xl
hover:scale-105
transition-all
duration-300
">

<Image

src={plant.image}

alt={plant.name}

width={300}
height={200}
className="w-full h-48 object-cover rounded-lg"

/>

<h2 className="text-xl font-bold mt-3 text-green-800">

{plant.name}

</h2>

<button className="
mt-auto
bg-green-600
hover:bg-green-700
text-white
font-semibold
px-5
py-2
rounded-lg
transition
">
Learn More →
</button>

</div>

);

}