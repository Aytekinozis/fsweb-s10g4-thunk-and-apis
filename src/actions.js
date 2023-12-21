import axios from "axios";
import { toast } from "react-toastify";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (info) => {
  /* toast("Favorilere eklendi", {
    type: "info",
    autoClose: 2000,
  }); */
  const data = {
    ...info,
    id: Date.now(),
  };
  return { type: FAV_ADD, payload: data };
};

export const removeFav = (id) => {
  /* toast("Favorilerden çıkarıldı", {
    type: "warning",
    autoClose: 2000,
  }); */
  return { type: FAV_REMOVE, payload: id };
};

export const fetchAnother = () => (dispatch) => {
  /* const toasterWithPromise = toast.loading("Bekleyedur..."); */
  dispatch({ type: FETCH_LOADING });
  axios
    .get("https://catfact.ninja/fact")
    .then((res) => {
      /* toast.update(toasterWithPromise, {
        render: "All is good",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      }); */
      dispatch({ type: FETCH_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      /* toast.update(toasterWithPromise, {
        render: "Hata oluştu",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      }); */
      dispatch({ type: FETCH_ERROR, payload: err.message });
    });
};
