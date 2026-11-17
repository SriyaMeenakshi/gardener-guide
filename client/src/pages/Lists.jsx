import useApi from "../hooks/useApi";
import { CareCard, MethodCard, DIYCard } from "../components/Cards";
import { PageHeader, ListState } from "../components/Status";

function ListPage({ path, title, subtitle, grid, render }) {
  const state = useApi(path);
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <ListState state={state}>
        <div className={grid}>{state.data?.map(render)}</div>
      </ListState>
    </>
  );
}

export const CareList = () => (
  <ListPage
    path="/care"
    title="💧 Plant Care Tips 🧑‍🌾"
    subtitle="Discover essential tips to keep your plants healthy and thriving, from watering schedules to pest control."
    grid="grid md:grid-cols-3 gap-6"
    render={(tip) => <CareCard key={tip.slug} tip={tip} />}
  />
);

export const MethodList = () => (
  <ListPage
    path="/methods"
    title="🌱 Gardening Methods"
    subtitle="Discover different ways to create a healthy garden."
    grid="grid md:grid-cols-3 gap-8"
    render={(m) => <MethodCard key={m.slug} method={m} />}
  />
);

export const DIYList = () => (
  <ListPage
    path="/diy"
    title="🛠 DIY Garden Projects 🎋"
    subtitle="Create a beautiful and eco-friendly garden."
    grid="grid md:grid-cols-3 gap-8"
    render={(p) => <DIYCard key={p._id} project={p} />}
  />
);
