import useApi from "../hooks/useApi";
import { CareCard, MethodCard, DIYCard } from "../components/Cards";
import { PageHeader, ListState } from "../components/Status";

function ListPage({ path, eyebrow, title, subtitle, grid, render }) {
  const state = useApi(path);
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <ListState state={state}>
        <div className={grid}>{state.data?.map(render)}</div>
      </ListState>
    </>
  );
}

export const CareList = () => (
  <ListPage
    path="/care"
    eyebrow="Care tips"
    title="Keep your plants happy"
    subtitle="Six short guides covering the basics: water, light, soil, feeding, pruning and pests."
    grid="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    render={(tip) => <CareCard key={tip.slug} tip={tip} />}
  />
);

export const MethodList = () => (
  <ListPage
    path="/methods"
    eyebrow="Gardening methods"
    title="Find a style that fits your space"
    subtitle="From a sunny terrace to a hydroponic shelf, there is a way to grow almost anywhere."
    grid="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    render={(m) => <MethodCard key={m.slug} method={m} />}
  />
);

export const DIYList = () => (
  <ListPage
    path="/diy"
    eyebrow="DIY garden ideas"
    title="Make something for your garden"
    subtitle="Eco-friendly projects you can build at home, each with a video tutorial to follow."
    grid="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    render={(p) => <DIYCard key={p._id} project={p} />}
  />
);
