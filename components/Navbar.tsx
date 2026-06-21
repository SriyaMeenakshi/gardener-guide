export default function Navbar(){
    return(
        <nav className="flex justify-between p-6">
            <h1 className="text-2xl font-bold">
                  GardenerGuide📗
            </h1>
            <div className="space-x-6">
                <a href="/">Home</a>
                <a href="/plants">Garden Plants</a>
                <a href="/plantcare">Plant Care Tips</a>
                <a href="/diy">DIY Garden Ideas</a>
                <a href="/methods">Gardening Methods</a>
            </div>
        </nav>
    );
    
}