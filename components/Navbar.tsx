export default function Navbar(){
    return(
        <nav className="flex justify-between p-6">
            <h1 className="text-2xl font-bold">
                  🪴Gardener Guide📗
            </h1>
            <div className="space-x-6">
                <a>Home</a>
                <a>Indoor Plants</a>
                <a>Plant Care Tips</a>
                <a>DIY Garden Crafts</a>
                <a>Gardening Methods</a>
            </div>
        </nav>
    );
    
}