import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostProps {
  post: Post;
}

const PostPage: React.FC<PostProps> = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of blog post slugs from your data source
  const slugs: string[] = ['post-1', 'post-2', 'post-3'];

  // Create an array of objects with `params` containing the slug parameter
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
};

interface Params extends ParsedUrlQuery {
  slug?: string;
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async ({ params }) => {
  // Ensure that `params` is not undefined
  if (!params || typeof params.slug !== 'string') {
    return { notFound: true };
  }

  // Fetch the blog post data based on the slug parameter
  const { slug } = params;
  const post: Post = {
    id: 1,
    title: `Post ${slug}`,
    content: 'Lorem ipsum dolor sit amet.',
  };

  return { props: { post } };
};

export default PostPage;
