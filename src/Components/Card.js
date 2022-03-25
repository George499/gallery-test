import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { ReactComponent as SpinnerIcon } from "../assets/spinner.svg";
import ImgsViewer from "react-images-viewer";

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;

const Card = () => {
  const [phrase, setPhrase] = useState("");
  const [images, setImages] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clickedImg, setClickedImg] = useState("../images/photo-1.jpg");
  const phraseRef = useRef(phrase);
  const imagesRef = useRef(images);
  const fetchingRef = useRef(fetching);

  const getImages = (query, page = 1) => {
    setFetching(true);
    fetchingRef.current = true;
    return new Promise((resolve) => {
      axios({
        method: "GET",
        url: "https://api.unsplash.com/search/photos",
        params: {
          query,
          page,
          perPage: 20,
          client_id: "bd3R2RCleuZ-9TJAStzb6yfW9RCBtdb8SNJ5kK48NK4",
        },
      }).then((result) => {
        setFetching(false);
        fetchingRef.current = false;
        resolve(result.data.results);
      });
    });
  };
  useEffect(() => {
    phraseRef.current = phrase;
    if (phrase !== "") {
      debounce(() => {
        setImages([]);
        getImages(phrase, 1).then((images) => {
          setImages(images);
          imagesRef.current = images;
        });
      }, 2000)();
    }
  }, [phrase]);
  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
    const isBottom = scrollHeight - scrollTop <= clientHeight;
    if (isBottom && !fetchingRef.current) {
      getImages(phraseRef.current, imagesRef.current.length / 20 + 1).then(
        (newImages) => {
          imagesRef.current = [...imagesRef.current, ...newImages];
          setImages(imagesRef.current);
        }
      );
    }
  };
  useEffect(() => {
    getImages((phraseRef.current = "blur"), 1).then((firstImages) => {
      imagesRef.current = [...imagesRef.current, ...firstImages];
      setImages(imagesRef.current);
    });
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => setPhrase(e.target.value);

  return (
    <>
      <div className="gap-6 pt-2 flex justify-center">
        <input
          className=" mb-12 px-2 rounded-full backdrop-blur-md bg-white/50 shadow-md h-[50px] w-1/2 dark:placeholder-white focus:outline-none focus:ring-purple-500 focus:ring-1 transition duration-200"
          type="text"
          placeholder="Search for images"
          value={phrase}
          onChange={handleSearch}
        />
      </div>

      {fetching && "Searching for the images"}
      <div className=" gap-6 pt-2 columns-3xs">
        {images.length > 0
          ? images.map((image, index) => (
              <figure className=" py-4 [break-inside:avoid]" key={image.id}>
                <div>
                  <img
                    onClick={() => {
                      setClickedImg(image.urls.regular);
                      setVisible(true);
                    }}
                    className=" rounded-md hover:opacity-75 hover:backdrop-filter hover:backdrop-blur-3xl hover:backdrop-saturate-300 hover:bg-black hover:bg-opacity-40  duration-300 cursor-pointer"
                    src={image.urls.regular}
                    alt="image1"
                  />
                </div>

                <figcaption className="mt-2 dark:text-white">
                  {image.user.name}
                </figcaption>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {image.alt_description}
                </p>
              </figure>
            ))
          : ""}

        {fetching && (
          <div className="flex justify-center items-center py-12">
            <SpinnerIcon className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        )}
      </div>
      <ImgsViewer
        imgs={[{ src: clickedImg }]}
        isOpen={visible}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default Card;
