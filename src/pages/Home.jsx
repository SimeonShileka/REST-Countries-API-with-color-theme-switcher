import { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../../data.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  const [visibleCount, setVisibleCount] = useState(24);

  const filteredCountries = data.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter ? country.region === regionFilter : true;
    return matchesSearch && matchesRegion;
  });

  const displayedCountries = filteredCountries.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 24);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 0' }}>
        <div className="search-container">
          <span style={{ marginRight: '1rem' }}>🔍</span>
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', color: 'inherit', outline: 'none' }}
          />
        </div>

        <select
          id="regionFilter"
          className="region-filter"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem 3rem' }}>
        {displayedCountries.map(country => (
          <Link to={`/country/${country.alpha3Code}`} key={country.alpha3Code} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: 'var(--clr-elements)', borderRadius: '5px', overflow: 'hidden', boxShadow: 'var(--box-shadow)' }}>
              <img src={country.flags.svg} alt={`Flag of ${country.name}`} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', fontWeight: '800' }}>{country.name}</h3>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visibleCount < filteredCountries.length && (
        <div id='load-more' style={{ textAlign: 'center', margin: '3rem 0' }}>
          <button
            onClick={handleLoadMore}
            className="load-more-btn"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
