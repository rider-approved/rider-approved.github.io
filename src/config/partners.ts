import type { ImageMetadata } from 'astro';
import coffeeRide from '../assets/partners/coffee-ride.jpg';

// A partner is listed only once they have agreed. Publishing a channel's name and
// logo before that presents an endorsement that does not exist, using someone
// else's brand. Removing an entry from this array retracts it everywhere.
//
// To add another partner:
//   1. Commit their avatar to src/assets/partners/<key>.<ext> — download it, never
//      hotlink, because platform avatar URLs rotate and 404 silently. Keep the real
//      extension: YouTube serves JPEG regardless of what the URL looks like, and
//      Astro reads the format from the filename.
//   2. Import it here and add the entry below.

export interface Partner {
  key: string;
  name: string;
  handle: string;
  platform: 'youtube' | 'instagram' | 'other';
  url: string;
  logo: ImageMetadata;
  blurb: string;
}

export const partners: Partner[] = [
  {
    key: 'coffee-ride',
    name: 'Coffee Ride Motorcycle',
    handle: '@CoffeeRideMotorcycle',
    platform: 'youtube',
    url: 'https://www.youtube.com/@CoffeeRideMotorcycle',
    logo: coffeeRide,
    // Describes the partnership, not the channel: anything about their content
    // would be us putting words in their mouth. Replace with their own wording.
    blurb: 'Canal parceiro no YouTube.',
  },
];

export function getPartner(key: string): Partner | undefined {
  return partners.find((p) => p.key === key);
}
