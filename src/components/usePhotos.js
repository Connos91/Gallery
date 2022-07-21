import React, { useEffect } from "react";

import { useQuery, useInfiniteQuery } from "react-query";
import * as C from "../reactQuery/gallery/constants";
import * as Q from "../reactQuery/gallery/queries";

const usePhotos = (page, limit) => {
  const fetchPhotos = async ({ pageParam = 0 }) => {
    const response = await Q.getPhotos(pageParam, limit);
    return { response, nextPage: pageParam + 1, totalPages: 20 };
  };

  const paging = useInfiniteQuery("photos", fetchPhotos, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage) {
        return pages.length + 1;
      }
    },
  });

  return paging;
};
export default usePhotos;
