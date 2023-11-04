import { useState } from "react";

const initialDogs = [
  {
    id: 1,
    name: "Buddy",
    price: 500,
    breed: "Golden Retriever",
    img: "/dogs/Buddy.jpg",
  },
  {
    id: 2,
    name: "Luna",
    price: 600,
    breed: "Labrador Retriever",
    img: "/dogs/Luna.jpg",
  },
  {
    id: 3,
    name: "Max",
    price: 400,
    breed: "Husky",
    img: "/dogs/Max.jpg",
  },
  {
    id: 4,
    name: "Misty",
    price: 350,
    breed: "Yorkshire",
    img: "/dogs/Misty.jpg",
  },
  {
    id: 5,
    name: "Stan",
    price: 400,
    breed: "Chihuhaua",
    img: "/dogs/Stan.jpg",
  },
];

function Button({ children, fct }) {
  //button used throughout app
  return (
    <button className="btn" onClick={() => fct()}>
      {children}
    </button>
  );
}

function FormAddDog({ onAddDog }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48"); // Initialize with an empty string

  const [price, setPrice] = useState("");
  const [breed, setBreed] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();

    const newDog = {
      id,
      name,
      image, // Use the image state
      price,
      breed,
    };

    onAddDog(newDog);
    console.log(newDog);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Dog name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Dog image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <label>Dog price</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      <label>Dog breed</label>
      <input
        type="text"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      ></input>
      <button type="submit" className="btn">
        Add
      </button>
    </form>
  );
}

export default function App() {
  //App, the main component
  const [dogs, setDogs] = useState(initialDogs);
  const [showDog, setShowDog] = useState(null);
  const [user, setUser] = useState("");
  const [address, setAddress] = useState("");
  const [addDog, setAddDog] = useState(null);

  function handleUserName(e) {
    return setUser(e);
  }

  function handleAddress(e) {
    return setAddress(e);
  }

  function submitDog(dog) {
    dog !== showDog ? setShowDog(dog) : setShowDog(null);
  }

  function toggleAddDog() {
    addDog === null ? setAddDog(true) : setAddDog(null);
    console.log(addDog);
  }

  function handleAddDog(dog) {
    setDogs((dogs) => [...dogs, dog]);
  }

  return (
    <div className="App">
      <div className="form ">
        <input
          type="text"
          value={user}
          placeholder="name"
          onChange={(e) => handleUserName(e.target.value)}
        ></input>
        <input
          type="text"
          value={address}
          placeholder="address"
          onChange={(e) => handleAddress(e.target.value)}
        ></input>
      </div>
      <div className="container">
        <ul className="dog-list">
          {dogs.map((dog) => (
            <div className="dog" key={dog.id}>
              <Dog
                name={dog.name}
                price={dog.price}
                breed={dog.breed}
                img={dog.img}
                key={dog.id} //each dog is now unique because of its id
              ></Dog>

              <Button fct={() => submitDog(dog)}>Buy</Button>
            </div>
          ))}
          <button onClick={() => toggleAddDog()}>Add dog</button>
        </ul>
      </div>
      <div>{showDog && <ShowDog dog={showDog} />}</div>
      <div>
        {showDog && <UserData dog={showDog} name={user} address={address} />}
      </div>
      <div>{addDog ? <FormAddDog onAddDog={handleAddDog} /> : null}</div>
    </div>
  );
}

function Dog({ name, price, breed, img }) {
  return (
    <li className="dog">
      <p>{name}</p>
      <p>{breed}</p>
      <img src={img} alt="dog" />
      <p>${price}</p>
    </li>
  );
}

function ShowDog({ dog }) {
  return (
    <div className="selectedDog">
      <p>YOUR SELECTED DOG:</p>
      <p>{dog.name}</p>
      <p>${dog.price}</p>
      <p>{dog.breed}</p>
      <img src={dog.img} alt="da"></img>
    </div>
  );
}

function UserData({ dog, name, address }) {
  return (
    <div className="user-msg">
      {name && address
        ? `${name}, you will get ${dog.name} at ${address}`
        : "please input your info"}
    </div>
  );
}
