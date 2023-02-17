import PostItem from "./PostItem";

const PostList = props => {
    return (

        <div>
        {props.items.map(post => (
          <PostItem
            key={post.id}
            post={post}
          />
          ))}
        </div>
      );
}
 
export default PostList;