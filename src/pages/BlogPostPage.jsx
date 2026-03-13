import BlogPost from "../components/blog/BlogPost";
import Footer    from "../components/layout/Footer";

export default function BlogPostPage({ postId, onBack }) {
  return (
    <>
      <BlogPost postId={postId} onBack={onBack} />
      <Footer />
    </>
  );
}