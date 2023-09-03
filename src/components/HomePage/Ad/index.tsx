import "./ad.scss";

const Ad = () => {
  return (
    <div className="ad-wrapper">
      <a className="ad-container" href="https://google.com" target="_blank">
        <img
          src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1200&fit=crop&crop=faces"
          alt="ad"
        />
        <p>AD</p>
      </a>
    </div>
  );
};

export default Ad;
