import {existsSync, readFileSync} from 'fs';
import {GetStaticProps, NextPage} from 'next';
import {bundleMDX} from 'mdx-bundler';
import {getMDXComponent} from 'mdx-bundler/client';
import {join} from 'path';
import React, {useMemo} from 'react';
import getReadingTime from 'reading-time';
import {Head, PostImage} from '../../components';
import {Post, PostFrontMatter} from '../../types';
import {getPostFilenames} from "../../scripts/utils";
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

// Build time Node.js code
export async function getStaticPaths() {
    // Get blog post file names
    const fileNames = getPostFilenames()
    const paths = fileNames.map((fileName) => ({
        params: {
            slug: fileName.replace(/.md[x]?$/gi, ''),
        },
    }))

    return {
        paths,
        fallback: false,
    };
}

interface PostPageProps {
    post: Post;
}


// Build time Node.js code
export const getStaticProps: GetStaticProps<PostPageProps> = async ({
                                                                        params,
                                                                    }) => {
    // Get slug of post from params
    const slug = params!.slug as string;

    let filePath = join(process.cwd(), 'posts', `${slug}.md`);
    if (!existsSync(filePath)) {
        filePath = join(process.cwd(), 'posts', `${slug}.mdx`)
    }

    // Read and bundle MDX source code
    const mdxSource = readFileSync(filePath, 'utf8');
    const bundleResult = await bundleMDX({
        source: mdxSource,
        mdxOptions(options, frontmatter) {
            // this is the recommended way to add custom remark/rehype plugins:
            // The syntax might look weird, but it protects you in case we add/remove
            // plugins in the future.
            // options.remarkPlugins = [...(options.remarkPlugins ?? []), myRemarkPlugin]
            options.rehypePlugins = [...(options.rehypePlugins ?? []), [rehypeHighlight, {ignoreMissing: true}]]
            return options
        },
    });
    // Create necessary post data for client
    const sourceCode = bundleResult.code;
    const frontMatter = bundleResult.frontmatter as Pick<
        PostFrontMatter,
        'title' | 'summary' | 'publishedAt'
    >;
    const readingTimeResult = getReadingTime(mdxSource);
    const wordCount = readingTimeResult.words;
    const readingTime = readingTimeResult.text;
    // console.log(mdxSource)
    // Return page props
    return {
        props: {
            post: {
                ...frontMatter,
                slug,
                wordCount,
                readingTime,
                sourceCode,
            },
        },
    };
};

// Client side React.js code
const PostPage: NextPage<PostPageProps> = ({post}) => {
    // Destructure post object
    const {title, summary, readingTime, sourceCode} = post;

    // Create string for publication date
    const publishedAt = useMemo(
        () =>
            new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        [post.publishedAt]
    );

    // Convert source code to component
    const BlogPost = useMemo(() => getMDXComponent(sourceCode), [sourceCode]);

    return (
        <div className="min-h-screen">
            <Head title={`${title} | Midnight Madman`} description={summary}/>

            <article>
                <h1>{title}</h1>
                <p className="text-base lg:text-lg mt-4 md:mt-6 lg:mt-8 mb-12 md:mb-20 lg:mb-24">
                    {publishedAt} · {readingTime}
                </p>

                {/*
        Since the return type "null" was not added to the component types of
        "mdx-bundler", but it is included by default in the "FC" type of React,
        I cast PostImage to "any". In the future, this may be removed again.
        */}
                <BlogPost components={{img: PostImage, Image: PostImage}}/>
            </article>
        </div>
    );
};

export default PostPage;
