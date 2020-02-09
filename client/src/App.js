import React from 'react';
import { fetchImageUrls } from './imageUtils';

function loadImageSources(setImageSources, setLoading, setFailure) {
  setLoading(true);

  fetchImageUrls().then((imageUrls) => {
    setImageSources(imageUrls);
    setLoading(false);
    setFailure(false);
  }).catch(() => {
    setFailure(true);
    setLoading(false);
  });
}

function App() {
  const [imageSources, setImageSources] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [failure, setFailure] = React.useState(false);

  React.useEffect(() => {
    loadImageSources(setImageSources, setLoading, setFailure);
  }, []);

  const refreshImages = React.useCallback(
    () => loadImageSources(setImageSources, setLoading, setFailure),
    [setImageSources, setLoading, setFailure],
  );


  return (
    <div className="container">
      <div className="row mt-4 justify-content-center">
        <h2>Randomized Images</h2>
      </div>
      <div className="row mt-4 justify-content-center">
        <button
          type="submit"
          className="btn-primary"
          onClick={refreshImages}
          disabled={loading}
        >
          {loading ? 'Loading' : 'Refresh'}
        </button>
      </div>
      <div className="row mt-4">
        {imageSources.map((imageSource) => (
          <div key={imageSource} className="col col-md-2 mt-4 mb-3 text-center">
            <img
              alt={imageSource}
              crossOrigin="anonymous"
              src={imageSource}
            />
          </div>
        ))}
      </div>
      {failure && (
      <div>
        <span>
          Sorry, there was an error loading your images.
          Try again later.
        </span>
      </div>
      )}
    </div>
  );
}


export default App;
