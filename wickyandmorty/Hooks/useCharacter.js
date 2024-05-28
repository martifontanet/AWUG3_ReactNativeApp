import { getCharacterDetail } from "../api";
import useFetcher from "./useFetcher";

export default function useCharacter() {
  const { data: char, loading, error, fetchData } = useFetcher();

  const searchCharacter = async (id) => {
    fetchData(getCharacterDetail, id);
  };

  return { char, loading, error, searchCharacter };
}
