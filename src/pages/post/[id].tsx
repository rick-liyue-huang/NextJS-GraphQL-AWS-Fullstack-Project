import { withSSRContext } from 'aws-amplify';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { GetPostQuery, ListPostsQuery, Post } from '../../API';
import { getPost, listPosts } from '../../graphql/queries';

interface Props {
  post: Post;
}

const IndividualPost: React.FC<Props> = ({ post }) => {
  console.log('post: ---', post);

  return <div>IndividualPost</div>;
};

/**
 *
 * @param context this function gets called at build time on server-side it may be called again, on a serverless function, if revalidation is enabled and a new request comes
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext();
  const postQuery = (await SSR.API.graphql({
    query: getPost,
    variables: {
      id: params?.id,
    },
  })) as { data: GetPostQuery };

  return {
    props: {
      post: postQuery.data.getPost as Post,
    },
  };
};

/**
 * this functions gets called at build time on server-side, it may be called again, on a serverless function, if the path has not been genereated
 */
// @ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();
  const response = (await SSR.API.graphql({ query: listPosts })) as {
    data: ListPostsQuery;
    error: any[];
  };

  const paths = response.data.listPosts?.items.map((post) => ({
    params: { id: post?.id },
  }));

  return { paths, fallback: 'blocking' };
};

export default IndividualPost;
