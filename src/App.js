import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';

// Data for Blog Posts
const BlogPosts = {
  '1': { title: 'First Blog Post', description: 'Description for the first post.' },
  '2': { title: 'Second Blog Post', description: 'Description for the second post.' }
};

// Home Component
function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home View</h2>
      <p>Welcome to the Home Page.</p>
    </div>
  );
}

// About Component
function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <p>This is the About Page.</p>
    </div>
  );
}

// Posts Component
function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      {/* Outlet renders nested routes */}
      <Outlet />
    </div>
  );
}

// PostLists Component
function PostLists() {
  return (
    <ul>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Post Component
function Post() {
  const { slug } = useParams();
  const post = BlogPosts[slug];
  if (!post) {
    return <p>Post not found.</p>;
  }
  const { title, description } = post;
  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// App Component
function App() {
  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>Home</Link>
        <Link to="/about" style={{ padding: 5 }}>About</Link>
        <Link to="/posts" style={{ padding: 5 }}>Posts</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />}>
          <Route path="" element={<PostLists />} />
          <Route path=":slug" element={<Post />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
