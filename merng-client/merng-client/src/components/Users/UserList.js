import UserItem from "./UserItem";
import './User.css'
import { Container } from "semantic-ui-react";

const UserList = props => {
    return (

      <Container>

      <ul className="users-list">
        {props.items.map(user => (
          <UserItem
            key={user.id}
            User={user}
          />
          ))}
            </ul>

            </Container>
      );
}
 
export default UserList;