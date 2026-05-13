export default async function handler(): Promise<Response> {
  const token = process.env['INSTAGRAM_ACCESS_TOKEN'];

  if (!token) {
    return Response.json(
      { error: 'INSTAGRAM_ACCESS_TOKEN não configurado nas variáveis de ambiente.' },
      { status: 500 },
    );
  }

  try {
    const url = new URL('https://graph.instagram.com/me/media');
    url.searchParams.set(
      'fields',
      'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp',
    );
    url.searchParams.set('access_token', token);
    url.searchParams.set('limit', '12');

    const resposta = await fetch(url.toString());

    if (!resposta.ok) {
      const erro = await resposta.json();
      return Response.json(erro, { status: resposta.status });
    }

    const dados = await resposta.json();

    return Response.json(dados, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return Response.json({ error: 'Falha ao conectar com o Instagram.' }, { status: 500 });
  }
}
