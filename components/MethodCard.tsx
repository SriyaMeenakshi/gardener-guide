import Link from "next/link";

export default function MethodCard({method}){

return(

<Link href={`/methods/${method.slug}`}>

<div className="
bg-white
rounded-xl
shadow-lg
overflow-hidden
cursor-pointer
hover:scale-105
transition
">

<img

src={method.image}

alt={method.name}

className="
w-full
h-48
object-cover
"

/>

<div className="p-5">

<h2 className="
text-2xl
font-bold
text-green-800
">

{method.name}

</h2>

</div>

</div>

</Link>

);

}