import CareCard from "@/components/CareCard";
import {careTips} from "@/data/care";
export default function PlantCare() {
  return (
    <main className="p-8">
        <h1 className="text-5xl font-bold text-center">
            💧Plant Care Tips🧑‍🌾
        </h1>
        <p className="text-center mt-4 text-xl">
            Discover essential tips and tricks to keep your plants healthy and thriving. From watering schedules to pest control, we've got you covered!
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
            {careTips.map((tip, index) => (
                <CareCard key={index} tip={tip} />
            ))}
        </div>
        </main>
  );
}