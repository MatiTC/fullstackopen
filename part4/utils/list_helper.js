const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let maxLikes = 0;
  let favorite = null;

  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes;
      favorite = blog;
    }
  });

  if (favorite) {
    delete favorite._id;
    delete favorite.__v;
    delete favorite.url;
  }
  return favorite;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // Crear un objeto con el número de blogs por autor
  const blogsByAuthor = _.groupBy(blogs, 'author');
  const authorCounts = _.mapValues(blogsByAuthor, 'length');

  // Encontrar al autor con la mayor cantidad de blogs
  const maxBlogs = _.max(Object.values(authorCounts));
  const mostProlificAuthor = _.findKey(
    authorCounts,
    (count) => count === maxBlogs
  );

  return { author: mostProlificAuthor, blogs: maxBlogs };
};

const mustLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  // Crear un objeto con la suma de likes por autor
  const likesByAuthor = _.groupBy(blogs, 'author');
  const authorLikes = _.mapValues(likesByAuthor, (blogs) =>
    _.sumBy(blogs, 'likes')
  );

  // Encontrar al autor con la mayor cantidad de likes
  const maxLikes = _.max(Object.values(authorLikes));
  const mostLikedAuthor = _.findKey(authorLikes, (likes) => likes === maxLikes);

  return { author: mostLikedAuthor, likes: maxLikes };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mustLikes,
};
