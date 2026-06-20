import DIYCard from "@/components/DIYCard";
import Navbar from "@/components/Navbar";
import {diyProjects}

from "@/data/diy";

export default function DIY(){

return(

<main className="p-8">
<Navbar />
<h1 className="
text-5xl
font-bold
text-center
">

🛠 DIY Garden Projects 🎋

</h1>

<p className="
text-center
text-xl
mt-4
">

Create a beautiful and eco-friendly garden.

</p>

<div className="
grid
md:grid-cols-3
gap-8
mt-10
">

{

diyProjects.map((project,index)=>(

<DIYCard

key={index}

project={project}

/>

))

}

</div>

</main>

);

}