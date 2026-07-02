import PlantCard from "./PlantCard";

export default function PlantCategory({category :category}: {category: {title: string; plants: {name: string; image: string; slug: string}[]}}) {

return(

<section className="my-10">

<h2 className="text-3xl font-bold mb-6">

{category.title}

</h2>

<div className="grid md:grid-cols-3 gap-6">

{category.plants.map((plant,index)=>(

<PlantCard

key={index}

plant={plant}

/>

))}

</div>

</section>

);

}