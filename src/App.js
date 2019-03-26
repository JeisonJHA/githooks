import React, { useState, useEffect } from "react";

export default function App() {
  const [location, setLocation] = useState({});
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    navigator.geolocation.watchPosition(handlePositionReceived);
    async function fetchData() {
      const response = await fetch(
        "https://api.github.com/users/jeisonjha/repos"
      );
      const data = await response.json();
      setRepositories(data);
    }
    fetchData();
    // array vazio siginifica que vai executar apenas uma vez(componentDidMount)
  }, []);

  function handlePositionReceived({ coords }) {
    const { latitude, longitude } = coords;
    setLocation({ latitude, longitude });
  }

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `Você tem ${filtered.length} documentos favoritos`;
    //componentDidUpdate
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      Latitude: {location.latitude} <br />
      Longitude: {location.longitude}
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </>
  );
}
