import { Container } from '@mui/material';
import { API } from 'aws-amplify';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ListPostsQuery, Post } from '../API';
import { PostPreview } from '../components/PostPreview';
import { useUser } from '../context/AuthContext';
import { listPosts } from '../graphql/queries';

const Home: NextPage = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  // Make a request to the graphql api
  useEffect(() => {
    const fetchPostsFromApi = async (): Promise<Post[]> => {
      const allPosts = (await API.graphql({ query: listPosts })) as {
        data: ListPostsQuery;
        error: any[];
      };
      if (allPosts.data) {
        setPosts(allPosts.data.listPosts?.items as Post[]);
        return allPosts.data.listPosts?.items as Post[];
      } else {
        throw new Error('could not get posts');
      }
    };
    fetchPostsFromApi();
  }, []);

  console.log('user: ', user);
  console.log('Posts: ---', posts);

  return (
    <Container maxWidth="md">
      {posts.map((post) => (
        <PostPreview post={post} key={post.id} />
      ))}
    </Container>
  );
};

// Get all the posts on the server-side
// Since all users can read posts in our schema logic
// we can use the API authorization method

// so we will call some code to access our GraphQL on the serverside

// render the posts on the home page to look like reddit posts

export default Home;
