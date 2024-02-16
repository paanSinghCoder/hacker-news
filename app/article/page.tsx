"use client";
import React, { useEffect, useState } from "react";
import queryString from "query-string";

const Article = () => {
  const [time, setTime] = useState("");
  const [about, setAbout] = useState("");
  const parsed =
    typeof window !== "undefined"
      ? queryString.parse(window.location.search)
      : "";

  useEffect(() => {
    try {
      fetch(
        `https://hacker-news.firebaseio.com/v0/user/${parsed?.name}.json?print=pretty`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setTime(res?.created);
          setAbout(res?.about);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div>Created at: {new Date(time).toString()}</div>
      <div>Created by: {parsed.name}</div>
      <div>Created by: {about}</div>
    </>
  );
};

export default Article;
