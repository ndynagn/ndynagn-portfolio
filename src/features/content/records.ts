import 'server-only';

import content from './portfolio.json';
import { parseContent } from './content-schema';

export const {
    profile,
    experience,
    education,
    courses,
    socialLinks,
    projects,
    skills,
    featuredSlugs,
} = parseContent(content);
