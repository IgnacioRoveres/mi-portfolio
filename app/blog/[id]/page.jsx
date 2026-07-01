import { notFound } from "next/navigation";
import { BLOG_POSTS } from "../../../data/blog";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import BlogPost from "../../../components/blog/BlogPost";

// Genera una página HTML estática en build time para cada post —
// esto es lo que hace que cada post tenga una URL real e indexable.
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ id: post.id }));
}

export function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.id === params.id);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS.find((p) => p.id === params.id);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <BlogPost post={post} />
      <Footer />
    </>
  );
}
