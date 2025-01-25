import { useState } from "react"
import "./index.css"
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
]

export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [isOpen, setIsOpen] = useState(false)
  const [userSelect, setUserSelect] = useState(``)

  function handleForm() {
    setIsOpen((show) => !show)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          userSelect={userSelect}
          setUserSelect={setUserSelect}
          friends={friends}
        />
        {isOpen && (
          <FormAddFrind setIsOpen={setIsOpen} setFriends={setFriends} />
        )}
        <Button onClick={handleForm}>{isOpen ? `Close` : `Add Friend`}</Button>
      </div>
      <FormSplitBill userSelect={userSelect} />
    </div>
  )
}

function FriendsList({ friends, userSelect, setUserSelect }) {
  return (
    <ul>
      {friends.map((user) => (
        <Friend
          userSelect={userSelect}
          setUserSelect={setUserSelect}
          key={user.id}
          friends={user}
        />
      ))}
    </ul>
  )
}

function Friend({ friends, userSelect, setUserSelect }) {
  function handleSelectUser() {
    setUserSelect((prev) => {
      if (prev.id === friends.id) {
        return false
      }
      return friends
    })
  }
  return (
    <li className={userSelect.id === friends.id ? "selected" : ""}>
      <img src={friends.image} alt={friends.name}></img>
      <h3>{friends.name}</h3>
      {friends.balance < 0 && (
        <p className="red">
          You owe {Math.abs(friends.balance)} {friends.name}{" "}
        </p>
      )}
      {friends.balance > 0 && (
        <p className="green">
          You owe {Math.abs(friends.balance)} {friends.name}{" "}
        </p>
      )}
      {friends.balance === 0 && <p>You and {friends.name} are even </p>}
      <Button onClick={handleSelectUser}>
        {userSelect.id === friends.id ? `Exit` : `Selected`}
      </Button>
    </li>
  )
}

function FormAddFrind({ setFriends, setIsOpen }) {
  const [name, setName] = useState("")
  const [image, setImageUrl] = useState("")

  function handleAddFriend(e) {
    e.preventDefault()
    const newFriend = {
      name,
      image,
      balance: 0,
      id: "id-" + Math.random().toString(36).substr(2, 9),
    }
    if (!name || !image) return
    setFriends((users) => [...users, newFriend])
    setName("")
    setImageUrl("")
    setIsOpen(false)
  }

  return (
    <form onSubmit={handleAddFriend} className="form-add-friend">
      <label>Friend Name 🫂</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      ></input>
      <label>🖼️ Image url </label>
      <input
        value={image}
        onChange={(e) => setImageUrl(e.target.value)}
        type="text"
      ></input>
      <Button>ADD</Button>
    </form>
  )
}

function FormSplitBill({ userSelect }) {
  if (!userSelect) return null
  console.log(userSelect)
  const { name, balance } = userSelect

  return (
    name && (
      <form className="form-split-bill">
        <h2>{`SPlit a bill with ${name}`}</h2>
        <label>Bill Value</label>
        <input type="text"></input>
        <label>Your expense</label>
        <input type="text"></input>
        <label>{name} Expense</label>
        <input value={balance} disabled type="text"></input>
        <label>Whose is paying the bill</label>
        <select>
          <option value="user">You</option>
          <option value={name}>{name}</option>
        </select>
        <Button>Split bill</Button>
      </form>
    )
  )
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}
