import { useInfiniteQuery } from "react-query";
import ImageItem from "../components/ImageItem";
import ImageList from "@mui/material/ImageList";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import InfiniteScroll from "react-infinite-scroller";

import * as C from "./constants";

import usePhotos from "./usePhotos";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 600,
      lg: 800,
      xl: 1536,
    },
  },
});

const Gallery = () => {
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("lg"));

  const {
    data = [],
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = usePhotos(C.pageParam, C.limit);

  const fetchMoreData = () => {
    setTimeout(() => {
      fetchNextPage();
    }, 5000);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>There was an error</p>
      ) : (
        <>
          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            hasMore={hasNextPage}
            loadMore={fetchMoreData}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            <ImageList
              variant="masonry"
              cols={
                isMobileSmall
                  ? 1
                  : isMobile
                  ? 1
                  : isTablet
                  ? 2
                  : isDesktop
                  ? 3
                  : 3
              }
              gap={8}
            >
              {data?.pages.map((page) =>
                page?.response.map((post) => (
                  <ImageItem key={post.id} photo={post} />
                ))
              )}
            </ImageList>
          </InfiniteScroll>
        </>
      )}
    </>
  );
};
export default Gallery;
