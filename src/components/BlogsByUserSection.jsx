const BlogsByUserSection = ({ userName, blogsByUser }) => {
  return (
    <section className="mt-10">
      <div className="container text-center">
        <h1 className="font-bold mb-7 text-2xl">More from "{userName}"</h1>
        <ul className="grid grid-cols-3">{blogsByUser}</ul>
      </div>
    </section>
  );
};

export default BlogsByUserSection;
