export default function CareCard({tip}){
    return(
            <div className="
            bg-white
            rounded-xl
            shadow-lg
            p-6
            flex
            flex-col
            h-55
            "> 
           <h2 className="text-2xl font-bold text-green-800">
                {tip.title}
            </h2>
            <p className="text-gray-700 mt-4">
                {tip.description}
            </p>
            <button className="
                mt-auto
                bg-green-600
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-green-700
                transition
                ">

                Read More →

                </button>
        </div>
    );
}