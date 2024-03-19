import React from 'react';
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import SearchBar from "@/pages/SearchBar";

export default function Home() {
  const [searchResults, setSearchResults] = React.useState([]);
  
  const handleSearch = async (query) => {
    if (query === '') {
      setSearchResults([]);  
    } else {
      try {
        const response = await fetch('/busquedas.json'); // Suponiendo que el archivo está en la carpeta public
        const data = await response.json();

        // Realizar la búsqueda en los datos cargados del JSON
        const results = data.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
      } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
        setSearchResults([]); 
      }
    }
  };

  return (
    <>
      <Head>
        <title>Buscador Priscete</title>
        <meta name="description" content="¡Bienvenido a Priscete!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/gorrito.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/gorrito.png"
            alt="Priscete Logo"
            width={180}
            height={180}
            priority
          />
        </div>
        <h1 className={styles.title}>Priscete</h1>
        <SearchBar onSearch={handleSearch} />
        <div className={styles.resultsContainer}>
          {searchResults.map(item => (
            <div key={item.id} className={styles.resultItem}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <img src={item.img} alt={item.title} className={styles.image} />
              <p>{item.date}</p>
              <a href={item.href}>{item.title}</a>
              <p>{item.merchant}</p>
              <p>{item.price}</p>
              <p>{item.featured ? 'Destacado' : 'No destacado'}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
