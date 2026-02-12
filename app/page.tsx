"use client";

import { useEffect } from "react";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

interface TestResponse {
  status: string;
  method: string;
}

export default function Home() {
  useEffect(() => {
    const results: Record<string, TestResponse | { error: string }> = {};

    Promise.all(
      methods.map((method) =>
        fetch("https://dummyjson.com/test", { method })
          .then((res) => res.json())
          .then((data) => {
            results[method] = data;
          })
          .catch((err) => {
            results[method] = { error: err.message };
          }),
      ),
    ).then(() => {
      console.log("All results:", results);
    });
  }, []);

  return <div>salam</div>;
}
