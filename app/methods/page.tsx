import { methods } from "@/data/methods";
import MethodCard from "@/components/MethodCard";
import Navbar from "@/components/Navbar";

export default function Methods(){

return(

<main className="p-8">
<Navbar/>

<h1 className="
text-5xl
font-bold
text-center
">

🌱 Gardening Methods

</h1>

<p className="
text-center
text-xl
mt-4
">

Discover different ways to create a healthy garden.

</p>

<div className="
grid
md:grid-cols-3
gap-8
mt-10
">

{
methods.map((method,index)=>(

<MethodCard

key={index}

method={method}

/>

))
}

</div>

</main>

);

}