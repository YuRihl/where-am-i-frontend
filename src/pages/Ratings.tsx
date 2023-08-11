import { FC, useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import RatingsTable from '../components/RatingsTable/RatingsTable';
import useFetch from '../hooks/use-fetch.hook';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRatingsPageProps {}

const RatingsPage: FC<IRatingsPageProps> = () => {
  const { executeFetch, loading } = useFetch(
    'http://localhost:3000/game/ratings'
  );
  const [ratings, setRatings] = useState<any | null>(null);

  useEffect(() => {
    const onLoad = async () => {
      const response = await executeFetch({
        url: 'http://localhost:3000/game/ratings',
        method: 'GET',
      });
      console.log(response, 'RESPONSE');

      setRatings(response);
    };

    onLoad();
  }, []);

  return loading ? (
    <ProgressBar />
  ) : (
    <RatingsTable data={ratings}></RatingsTable>
  );
};

export default RatingsPage;
