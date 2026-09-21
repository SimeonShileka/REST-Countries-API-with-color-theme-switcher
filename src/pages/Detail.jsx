import { useParams, Link } from 'react-router-dom';
import data from '../../data.json';

export default function Detail() {
  const { code } = useParams();
  
  const country = data.find(c => c.alpha3Code === code);

  if (!country) {
    return <div>Country not found</div>;
  }

  const borderCountries = (country.borders || []).map(borderCode => {
    const borderCountry = data.find(c => c.alpha3Code === borderCode);
    return {
      code: borderCode,
      name: borderCountry ? borderCountry.name : borderCode
    };
  });

  const nativeName = country.nativeName || 'N/A';
  const currencies = (country.currencies || []).map(c => c.name).join(', ') || 'N/A';
  const languages = (country.languages || []).map(l => l.name).join(', ') || 'N/A';
  const topLevelDomain = (country.topLevelDomain || []).join(', ') || 'N/A';

  return (
    <div style={{ padding: '3rem 0' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', background: 'var(--clr-elements)', textDecoration: 'none', color: 'inherit', boxShadow: '0 0 5px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
        <span>&larr;</span> Back
      </Link>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '4rem', gap: '5rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img src={country.flags.svg} alt={`Flag of ${country.name}`} style={{ width: '100%', objectFit: 'cover', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }} />
        </div>

        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>{country.name}</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ flex: '1' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>Native Name:</strong> {nativeName}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Region:</strong> {country.region}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Capital:</strong> {country.capital || 'N/A'}</p>
            </div>
            <div style={{ flex: '1' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>Top Level Domain:</strong> {topLevelDomain}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Currencies:</strong> {currencies}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Languages:</strong> {languages}</p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
              <strong>Border Countries:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {borderCountries.map(border => (
                  <Link 
                    key={border.code} 
                    to={`/country/${border.code}`}
                    style={{ background: 'var(--clr-elements)', padding: '0.25rem 1rem', textDecoration: 'none', color: 'inherit', boxShadow: '0 0 5px rgba(0,0,0,0.1)', borderRadius: '2px', fontSize: '14px' }}
                  >
                    {border.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
