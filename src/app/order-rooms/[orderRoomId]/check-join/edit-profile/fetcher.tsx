import {
  birdImage,
  cat1Image,
  cat2Image,
  cat3Image,
  cat4Image,
  cat5Image,
  dog1Image,
  rabbit1Image,
  rabbit2Image,
  whale1Image,
} from "@/constants/urls";
import { CheckJoinEditProfileState } from "./state";

export const checkJoinEditProfileFetcher: () => CheckJoinEditProfileState =
  () => {
    const images = [
      birdImage,
      cat1Image,
      cat2Image,
      cat3Image,
      cat4Image,
      cat5Image,
      dog1Image,
      rabbit1Image,
      rabbit2Image,
      whale1Image,
    ];

    return {
      dummyShuffleImages: shuffle(images),
    };
  };

export default function shuffle<T>(array: T[]) {
  const out = Array.from(array);
  for (let i = out.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[r];
    out[r] = tmp;
  }
  return out;
}
