// pages/index.js
import React, { useEffect } from 'react';
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import SearchBar from "@/pages/SearchBar";
import { MeiliSearch } from 'meilisearch'

const client = new MeiliSearch({
  host: 'https://priscete.cloud',
  apiKey: 'Priscete_Genesis5C',
})

const index = client.index('Users_uid')

export default function Home() {
  const [searchResults, setSearchResults] = React.useState([]);
  const [query, setQuery] = React.useState('');

  useEffect(() => {
    const fetchResults = async () => {
      if (query === '') {
        setSearchResults([]);  
      } else {
        try {
          // Meilisearch is typo-tolerant:
          const search = await index.search(query)
          setSearchResults(search.hits);
        } catch (error) {
          console.error('Error al realizar la búsqueda con MeiliSearch:', error);
          setSearchResults([]); 
        }
      }
    };

    fetchResults();
  }, [query]);

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
        <SearchBar onSearch={setQuery} />
        <div className={styles.resultsContainer}>
          {searchResults.map(item => (
            <div key={item.id} className={styles.resultItem}>
              <h2>ID: {item.id}</h2>
              <p>Nombre: {item.first_name} {item.last_name}</p>
              <p>Email: {item.email}</p>
              <p>Género: {item.gender}</p>
              <p>Dirección IP: {item.ip_address}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
