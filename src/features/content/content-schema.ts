import 'server-only';

import { z } from 'zod';

import type { ContentCatalogue } from './models';

const text = z.string().trim().min(1);
const slug = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const webUrl = z.url({ protocol: /^https?$/ });
const contactUrl = z.url({ protocol: /^(https?|mailto)$/ });
const labels = z.object({ ru: text, en: text });
const translations = <T extends z.ZodType>(schema: T) =>
    z.object({ ru: schema.optional(), en: schema.optional() });
const education = z.object({
    id: slug,
    year: text,
    translations: translations(
        z.object({ title: text, description: text, yearNote: text.optional() }),
    ),
});
const imagePath = text.regex(/^\/images\/projects\/[a-z0-9-]+\/[a-z0-9-]+\.webp$/);
const galleryGroup = z.object({
    id: slug,
    translations: translations(z.object({ title: text })),
    images: z.array(
        z.object({
            id: slug,
            src: imagePath,
            thumbnail: imagePath,
            width: z.number().int().positive(),
            height: z.number().int().positive(),
            translations: translations(z.object({ alt: text, caption: text })),
        }),
    ),
});

const catalogueSchema = z
    .object({
        profile: z
            .object({
                translations: translations(
                    z.object({
                        published: z.boolean(),
                        name: text,
                        nameLines: z.array(text).min(1),
                        headline: text,
                        summary: text,
                        cvPath: text.regex(/^\/documents\/[a-z0-9-]+\.pdf$/).optional(),
                        about: z.array(text).min(1),
                        location: text,
                        workFormat: text,
                        languages: z.array(text).min(1),
                        availability: text,
                    }),
                ),
            })
            .nullable(),
        experience: z.array(
            z.object({
                id: slug,
                organization: text,
                period: text,
                projectSlug: slug.optional(),
                translations: translations(
                    z.object({
                        role: text,
                        organizationLabel: text,
                        actionLabel: text.optional(),
                        description: text,
                        periodLabel: text,
                        projectLines: z.array(text),
                    }),
                ),
            }),
        ),
        education: z.array(education),
        courses: z.array(education),
        socialLinks: z.array(z.object({ id: slug, href: contactUrl, labels })),
        skills: z.array(text),
        featuredSlugs: z.array(slug),
        projects: z.array(
            z.object({
                id: slug,
                slug,
                kind: z.enum(['professional', 'pet']),
                category: z.enum(['commerce', 'service']),
                palette: z.enum([
                    'onetouch',
                    'potlucky',
                    'immergas',
                    'klimatprof',
                    'checkai',
                    'galleria-minsk',
                    'golden-plate',
                    'aventin',
                ]),
                titleLines: z.object({ ru: z.array(text), en: z.array(text) }),
                platforms: text,
                eyebrow: text,
                labels,
                technologies: z.array(text),
                websiteUrl: webUrl.optional(),
                sourceUrl: webUrl.optional(),
                gallery: z.array(galleryGroup),
                translations: translations(
                    z.object({
                        published: z.boolean(),
                        title: text,
                        summary: text,
                        tagline: text.optional(),
                        periodLabel: text.optional(),
                        role: text.optional(),
                        contributions: z.array(text),
                        engineering: z
                            .object({
                                title: text,
                                context: text,
                                approach: text,
                                outcome: text,
                            })
                            .optional(),
                    }),
                ),
            }),
        ),
    })
    .superRefine((catalogue, context) => {
        const unique = (values: readonly string[], path: string, key?: string) => {
            const seen = new Set<string>();
            values.forEach((value, index) => {
                if (seen.has(value)) {
                    context.addIssue({
                        code: 'custom',
                        path: key ? [path, index, key] : [path, index],
                        message: `Duplicate ${value}`,
                    });
                }
                seen.add(value);
            });
        };
        for (const collection of [
            'experience',
            'education',
            'courses',
            'socialLinks',
            'projects',
        ] as const) {
            unique(
                catalogue[collection].map((record) => record.id),
                collection,
                'id',
            );
        }
        unique(
            catalogue.projects.map((project) => project.slug),
            'projects',
            'slug',
        );
        unique(catalogue.featuredSlugs, 'featuredSlugs');
        const mediaIds = new Set<string>();
        catalogue.projects.forEach((project, projectIndex) => {
            project.gallery.forEach((group, groupIndex) => {
                const entries = [
                    { id: group.id, path: ['projects', projectIndex, 'gallery', groupIndex, 'id'] },
                    ...group.images.map((image, imageIndex) => ({
                        id: image.id,
                        path: [
                            'projects',
                            projectIndex,
                            'gallery',
                            groupIndex,
                            'images',
                            imageIndex,
                            'id',
                        ],
                    })),
                ];
                for (const entry of entries) {
                    if (mediaIds.has(entry.id)) {
                        context.addIssue({
                            code: 'custom',
                            path: entry.path,
                            message: `Duplicate media ID ${entry.id}`,
                        });
                    }
                    mediaIds.add(entry.id);
                }
            });
        });
        catalogue.featuredSlugs.forEach((value, index) => {
            if (!catalogue.projects.some((project) => project.slug === value)) {
                context.addIssue({
                    code: 'custom',
                    path: ['featuredSlugs', index],
                    message: `Unknown project ${value}`,
                });
            }
        });
        catalogue.experience.forEach((record, index) => {
            if (
                record.projectSlug &&
                !catalogue.projects.some((project) => project.slug === record.projectSlug)
            ) {
                context.addIssue({
                    code: 'custom',
                    path: ['experience', index, 'projectSlug'],
                    message: `Unknown project ${record.projectSlug}`,
                });
            }
        });
    });

/** Repository JSON shares the application contract; no transport DTO or network fallback exists.
 * Invalid editorial data is a build error with an actionable field path.
 */
export function parseContent(value: unknown): ContentCatalogue {
    const result = catalogueSchema.safeParse(value);
    if (!result.success) {
        throw new Error(
            `Invalid portfolio content:\n${result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('\n')}`,
        );
    }
    return result.data;
}
