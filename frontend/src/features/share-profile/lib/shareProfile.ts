export async function shareProfile(profileId: string, displayName: string) {
  const url = `${window.location.origin}/profile/${profileId}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: displayName, url });
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Не удалось поделиться анкетой', error);
      }
    }
    return;
  }

  await navigator.clipboard.writeText(url);
}
