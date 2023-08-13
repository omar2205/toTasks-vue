const getImdbURL = (q: string) => {
  const qlc = q.toLowerCase()
  return `https://v2.sg.media-imdb.com/suggestion/${qlc[0]}/${qlc}.json`
}

Deno.serve(async (req: Request) => {
  const q = new URL(req.url).searchParams.get('q')
  if (!q) return new Response(`Use /?q=Name`)

  const data = await fetch(getImdbURL(q))
    .then(res => res.json())
    .then(data => data.d)
    .catch(console.error)

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'hello': 'there/1',
    }
  })
})
