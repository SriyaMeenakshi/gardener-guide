export default function DIYCard({project}){

return(

<div className="
bg-white
rounded-xl
shadow-lg
p-6
flex
flex-col
justify-between
h-100
hover:scale-105
transition
">

<div>

<h2 className="
text-2xl
font-bold
text-green-800
">

{project.title}

</h2>

<p className="
mt-4
text-gray-700
">

{project.description}

</p>

<a
  href={project.link}
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src={project.image}
    alt={project.title}
    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
  />
</a>

</div>

<a

href={project.link}

target="_blank"

>

<button className="
mt-5
bg-green-600
hover:bg-green-700
text-white
px-5
py-2
rounded-lg
hover:scale-105
transition
">

▶ Watch Tutorial

</button>

</a>

</div>

);

}