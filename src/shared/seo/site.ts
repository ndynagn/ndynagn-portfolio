import 'server-only';

/**
 * Returns the configured public origin, or undefined for missing/development origins.
 * @throws When SITE_URL is malformed or includes credentials, a path, query or fragment.
 */
export function getSiteUrl(): URL | undefined {
    const value = process.env.SITE_URL?.trim();

    if (!value) {
        return undefined;
    }

    let url: URL;

    try {
        url = new URL(value);
    } catch {
        throw new Error('SITE_URL must be an absolute HTTP(S) origin.');
    }

    if (
        !['https:', 'http:'].includes(url.protocol) ||
        url.username ||
        url.password ||
        url.pathname !== '/' ||
        url.search ||
        url.hash
    ) {
        throw new Error(
            'SITE_URL must be an HTTP(S) origin without credentials, a path, query or fragment.',
        );
    }

    const hostname = url.hostname.toLowerCase();
    const ipv4 = /^(\d{1,3})\.(\d{1,3})\.\d{1,3}\.\d{1,3}$/.exec(hostname);
    const firstOctet = Number(ipv4?.[1]);
    const secondOctet = Number(ipv4?.[2]);
    const privateIpv4 =
        Boolean(ipv4) &&
        (firstOctet === 0 ||
            firstOctet === 10 ||
            firstOctet === 127 ||
            (firstOctet === 169 && secondOctet === 254) ||
            (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) ||
            (firstOctet === 192 && secondOctet === 168));
    const privateHost =
        privateIpv4 ||
        /\.(localhost|local|test|invalid)$/.test(hostname) ||
        hostname.startsWith('[') ||
        !hostname.includes('.');

    return privateHost ? undefined : url;
}
