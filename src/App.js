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
    <button
      className="button"
      onClick={() => setAddFriend((addFriend) => !addFriend)}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [addFriend, setAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function addNewFriend(newItems) {
    setFriends((friends) => [...friends, newItems]);
    setAddFriend(!addFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {addFriend && <FormAddFriend addNewFriend={addNewFriend} />}
        <Button addFriend={addFriend} setAddFriend={setAddFriend}>
          {addFriend ? `Close` : `Add friend`}
        </Button>
      </div>
      {selectedFriend && <FormSpiltBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friends, setSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, setSelectedFriend, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <button className="button" onClick={() => setSelectedFriend(friend)}>
        Select
      </button>
    </li>
  );
}
function FormAddFriend({ addNewFriend }) {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  function displayFriend() {
    if (name && photo) {
      const newItems = {
        id: Date(),
        name: name,
        image: photo,
        balance: 0,
      };
      addNewFriend(newItems);
      setName("");
      setPhoto("");
    }
  }
  return (
    <form className="form-add-friend" onSubmit={(e) => e.preventDefault()}>
      <label>💏Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌆 Image URL</label>
      <input
        type="text"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <button className="button" onClick={displayFriend}>
        Add
      </button>
    </form>
  );
}
function FormSpiltBill({ selectedFriend }) {
  const [bill, setBill] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const [amountPayedByMe, setAmountPayedByMe] = useState("");
  const [amountPayedByFriend, setAmountPayedByFriend] = useState("");
  return (
    <form className="form-split-bill" onSubmit={(e) => e.preventDefault()}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>🤑 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => {
          setBill(+e.target.value);
          setAmountPayedByFriend(+bill - +amountPayedByMe);
        }}
      />

      <label>🧞Your expense</label>
      <input
        type="text"
        value={amountPayedByMe}
        onChange={(e) => {
          setAmountPayedByMe(+e.target.value);
          setAmountPayedByFriend(+bill - amountPayedByMe);
        }}
      />

      <label>💏 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={amountPayedByFriend} />

      <label>🤑 Who's paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button
        onClick={() => {
          selectedFriend.balance += amountPayedByFriend;
        }}
      >
        Split bill
      </Button>
    </form>
  );
}
