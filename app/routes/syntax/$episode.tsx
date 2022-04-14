import { useLoaderData, useOutletContext } from "@remix-run/react";
import type { LinksFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import styles from "~/styles/syntax/episode.css";

export type Episode = {
  number: number;
  title: string;
  date: number;
  slug: string;
  url: string;
  html: string;
  notesFile: string;
  displayDate: string;
  displayNumber: string;
}

export let links: LinksFunction = () => {
  return[
    { rel: "stylesheet", href: styles },
  ]
}

export let loader: LoaderFunction = async ({ params })  => {
  let episodeNumber = params?.episode as string;
  if (episodeNumber?.length < 3) {
    episodeNumber = episodeNumber.padStart(3, '0');
    return redirect(`/syntax/${episodeNumber}`, 301);
  }
  const response = await fetch(`https://syntax.fm/api/shows/${params.episode}`);
  const episode = await response.json();
  if (!episode?.url) {
    throw json("Episode Not Found", { status: 404 });
  }
  return episode;
};

export default function() {
  const { podcastName } = useOutletContext();
  const episode = useLoaderData<Episode>();
  if (!episode) {
    return null;
  }
  return (
    <div className="max-w-xl py-4 px-8 bg-white shadow-lg rounded-lg my-20 episode-details">
      {/* <div className="flex justify-center md:justify-end -mt-16">
        <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80">
      </div> */}
      <div>
        <h1 className="text-2xl font-bold">{podcastName}</h1>
        <h2 className="text-gray-800 text-3xl font-semibold"> #{episode.number}: {episode.title}</h2>
        <audio controls className="mt-4" src={episode.url} />
        <div className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: episode.html }} />
      </div>
      {/* <div className="flex justify-end mt-4">
        <a href="#" className="text-xl font-medium text-indigo-500">John Doe</a>
      </div> */}
    </div>
  );
}
