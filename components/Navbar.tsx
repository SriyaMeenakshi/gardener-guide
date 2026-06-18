export default function Navbar(){
    return(
        <nav className="flex justify-between p-6">
            <h1 className="text-2xl font-bold">
                  🪴Gardener Guide📗
            </h1>
            <div className="space-x-6">
                <a href="/">Home</a>
                <a href="/plants">Plants for Your Home Garden</a>
                <a href="/care-tips">Plant Care Tips</a>
                <a href="/diy-crafts">DIY Garden Crafts</a>
                <a href="/gardening-methods">Gardening Methods</a>
            </div>
        </nav>
    );
    
}