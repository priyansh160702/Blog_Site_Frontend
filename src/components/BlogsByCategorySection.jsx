const BlogsByCategorySection = ({ category, blogsByCategory }) => {
  return (
    <section className="mt-10">
      <div className="container text-center">
        <h1 className="font-bold text-2xl mb-7">More in "{category}"</h1>
        <ul className="grid place-items-center md:grid-cols-3">
          {blogsByCategory}
        </ul>
      </div>
    </section>
  );
};

export default BlogsByCategorySection;
