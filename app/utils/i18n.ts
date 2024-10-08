import { Params } from "@remix-run/react";

export function getLang(params: Params<string>) {
  const lang = params.lang ?? "da";

  if (lang !== "da" && lang !== "en") {
    throw new Response(null, {
      status: 404,
      statusText: `Not Found: Invalid language ${lang}`,
    });
  }

  return lang;
}
