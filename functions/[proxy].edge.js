const mobileHost = "edge-device-adaptation-mobile.contentstackapps.com";
const webHost = "edge-device-adaptation-test.contentstackapps.com";

export default async function handler(request) {
  const userAgentHeader = request.headers.get('User-Agent');
  const modifiedUrl = new URL(request.url);
  console.log(isMobile(userAgentHeader))
  if (isMobile(userAgentHeader)) {
    modifiedUrl.hostname = mobileHost;
  } else {
    modifiedUrl.hostname = webHost;
  }
console.log(modifiedUrl.hostname)
  const newRequest = new Request(modifiedUrl, request);
  return fetch(newRequest);
}

function isMobile(userAgent) {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(userAgent);
}
