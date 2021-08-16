const baseUrl = 'https://rainbow.me';

const constructDeeplink = (uri: string): string => {
  const encodedUri = encodeURIComponent(uri);
  const fullUrl = `${baseUrl}/wc?uri=${encodedUri}`;
  return fullUrl;
};

export { constructDeeplink };
