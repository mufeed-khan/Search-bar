import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [inputs, setInput] = useState("");
  const [results, setResult] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    const data = await fetch(
      "https://dummyjson.com/recipes/search?q=" + inputs
    );
    const json = await data.json();
    setResult(json?.recipes);
    setCache((pre) => ({ ...pre, [inputs]: json?.recipes }));
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputs]);

  return (
    <div className="App">
      <h1>AutoComplete Search Bar</h1>
      <input
        type="text"
        value={inputs}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      {showResults && (
        <div className="result-container">
          {results.map((r) => (
            <span className="result" key={r.id}>
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
