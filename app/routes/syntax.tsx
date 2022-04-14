import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import type { Episode } from "./syntax/$episode";

export let meta: MetaFunction = () => ({
  title: "Syntax Podcast",
  description: "Syntax Podcast episodes",
});

export let loader: LoaderFunction = async () => {
  const response = await fetch('https://syntax.fm/api/shows');
  const episodes: Episode = await response.json();
  return episodes;
}

export default function Syntax() {
  const episodes = useLoaderData<Episode[]>();
  return (
    <div className="prose lg:prose-xl text-center w-screen h-screen m-0">
      <section className="w-screen">
        <h1>Syntax Podcast</h1>
      </section>
      <section className="w-screen cols">
        <aside className="mt-4 text-left flex flex-row gap-3 playlist max-h-">
          <ul>
            {episodes.map((episode: Episode) => (
            <li key={episode.displayNumber}>
              <Link to={`/syntax/${episode.displayNumber}`} prefetch="intent">
                {episode.number}: {episode.title}
              </Link>
            </li>
            ))}
          </ul>
        </aside>
        <Outlet context={{ podcastName: 'Syntax Podcast'}} />
      </section>
    </div>
  )
}
