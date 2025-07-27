import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, addFriend, setAddFriend }) {
  return (
    <button className="button" onClick={() => setAddFriend(!addFriend)}>
      {children}
    </button>
  );
}

export default function App() {
  const [addFriend, setAddFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendPhoto, setNewFriendPhoto] = useState("");
  const [friends, setFriends] = useState(initialFriends);

  function displayFriend() {
    if (newFriendName && newFriendPhoto) {
      const newItems = {
        id: Date(),
        name: newFriendName,
        image: newFriendPhoto,
        balance: 0,
      };
      setFriends((friends) => [...friends, newItems]);
      setNewFriendName("");
      setNewFriendPhoto("");
    }
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {addFriend && (
          <FormAddFriend
            newFriend={newFriendName}
            setNewFriendName={setNewFriendName}
            setNewFriendPhoto={setNewFriendPhoto}
            newFriendPhoto={newFriendPhoto}
            displayFriend={displayFriend}
          />
        )}
        <Button addFriend={addFriend} setAddFriend={setAddFriend}>
          {addFriend ? `Close` : `Add friend`}
        </Button>
      </div>
      <FormSpiltBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$.
        </p>
      )}
      {friend.balance === 0 && <p>You are even with {friend.name}.</p>}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$.
        </p>
      )}
      <Button>Select</Button>
    </li>
  );
}
function FormAddFriend({
  newFriendName,
  setNewFriendName,
  newFriendPhoto,
  setNewFriendPhoto,
  displayFriend,
}) {
  return (
    <form className="form-add-friend" onSubmit={(e) => e.preventDefault()}>
      <label>💏Friend name</label>
      <input
        type="text"
        value={newFriendName}
        onChange={(e) => setNewFriendName(e.target.value)}
      />

      <label>🌆 Image URL</label>
      <input
        type="text"
        value={newFriendPhoto}
        onChange={(e) => setNewFriendPhoto(e.target.value)}
      />
      <button className="button" onClick={displayFriend}>
        Add
      </button>
    </form>
  );
}
function FormSpiltBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>🤑 Bill Value</label>
      <input type="text" />

      <label>🧞Your expense</label>
      <input type="text" />

      <label>💏 X's expense</label>
      <input type="text" disabled />

      <label>🤑 Who's paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
