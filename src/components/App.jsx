import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import CustomLoader from "./CustomLoader";
import Modal from "./Modal";
import { getImg } from "services/api";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);

    try {
      const { hits, totalHits } = await getImg(query, page);

      if (hits.length === 0) {
        return alert("Don't found");
      }

      setImages((prevImages) => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / 12));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (clickedLargeImageURL, clickedTags) => {
    setLargeImageURL(clickedLargeImageURL);
    setTags(clickedTags);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setLargeImageURL("");
    setTags("");
    setShowModal(false);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearchSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}

      {error && <p>Something went wrong...</p>}

      {isLoading && <CustomLoader />}

      {loadMore && !isLoading && images.length > 0 && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}

      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
