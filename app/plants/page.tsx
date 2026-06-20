import { plantCategories } from "@/data/plants";
import Navbar from "@/components/Navbar";

import PlantCategory from "@/components/PlantCategory";

export default function Plants(){

return(

<main className="p-8">

<Navbar />

<h1 className="text-5xl font-bold text-center">

🌱 Plants for Your Home Garden

</h1>

<p className="text-center mt-4">

Find the perfect plants for your mini garden.

</p>

{

plantCategories.map((category,index)=>(

<PlantCategory

key={index}

category={category}

/>

))

}

</main>

);

}