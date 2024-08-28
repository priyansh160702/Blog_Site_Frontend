const BlogsByCategorySection = ({ category, blogsByCategory }) => {
  return (
    <section>
      <div className="container text-center">
        <h1 className="font-bold text-2xl">More from "{category}"</h1>
        <ul className="grid grid-cols-3">{blogsByCategory}</ul>
      </div>
    </section>
  );
};

export default BlogsByCategorySection;
