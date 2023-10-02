"use client";

import { useEffect, useState } from "react";
import getNowPlayingItem from "./api";

export const Spotify = ({ ...props }) => {
  const [result, setResult] = useState({});

  useEffect(() => {
    Promise.all([
      getNowPlayingItem(
        props.client_id,
        props.client_secret,
        props.refresh_token,
      ),
    ]).then((results) => {
      setResult(results[0]);
    });
  });

  return (
    <div data-scroll data-scroll-speed="2">
      {result.title !== undefined &&
      result.isPlaying &&
      result.albumImageUrl ? (
        <div
          href={result.songUrl}
          target="_blank"
          className="flex w-[400px] select-none gap-4 rounded-2xl bg-white/20 p-4 shadow-xl backdrop-blur-md max-md:w-full"
        >
          <img
            src={result.albumImageUrl}
            alt={`${result.title}s Album Cover`}
            className="pointer-events-none max-h-[130px] rounded-xl"
          />
          <div className="flex grow flex-col justify-center overflow-hidden">
            <p className="mb-2 text-xs">Now Playing</p>
            <a
              href={result.songUrl}
              target="_blank"
              rel="noreferrer"
              className="no-underline"
            >
              <h2 className="text-2xl leading-5">{result.title}</h2>
            </a>
            <p className="leading-6">{result.artist}</p>
          </div>
        </div>
      ) : (
        <div className="flex w-[400px] select-none gap-4 rounded-2xl bg-white/20 p-4 shadow-xl backdrop-blur-md max-md:w-full ">
          <div className="flex grow flex-col justify-center overflow-hidden">
            <p style={{ fontSize: "9pt" }}>Spotify</p>
            <h2 className="text-2xl">Currently Offline :(</h2>
            <p className="leading-3">Come back later?</p>
          </div>
        </div>
      )}
    </div>
  );
};
