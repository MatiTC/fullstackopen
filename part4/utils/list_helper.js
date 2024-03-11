const dummy = (blogs) => {
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
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
