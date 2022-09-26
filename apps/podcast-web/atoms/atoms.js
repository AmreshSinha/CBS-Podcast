import { atom } from "recoil";

export const musicUrl = atom({
  key: "musicUrl",
  default: "",
});

export const musicPlaying = atom({
  key: "musicPlaying",
  default: false,
});
