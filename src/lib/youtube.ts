export function getYouTubeVideoId(video: string) {
  const value = video.trim();

  if (!value) {
    return '';
  }

  try {
    const url = new URL(value);

    if (url.hostname.includes('youtu.be')) {
      return url.pathname.split('/').filter(Boolean)[0] || '';
    }

    if (url.hostname.includes('youtube.com')) {
      if (url.pathname.startsWith('/embed/')) {
        return url.pathname.split('/').filter(Boolean)[1] || '';
      }

      return url.searchParams.get('v') || '';
    }
  } catch {
    // Stored project data can be a bare YouTube id with optional query params.
  }

  return value.split('?')[0].split('&')[0];
}

export function getYouTubeEmbedUrl(video: string, autoplay = false) {
  const videoId = getYouTubeVideoId(video);
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });

  if (autoplay) {
    params.set('autoplay', '1');
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}?${params.toString()}` : '';
}

export function getYouTubeThumbnailUrl(video: string) {
  const videoId = getYouTubeVideoId(video);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
}
