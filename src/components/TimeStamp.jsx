import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getTimeDifference } from 'src/utils/datetime';

const TimeStamp = props => {
  const oneMinute = 1000 * 60;
  const { time } = props
  const [timeAgo, setTimeAgo] = useState(getTimeDifference(time));
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (timeAgo !== getTimeDifference(time)) {
      setTimeAgo(getTimeDifference(time));
    }
  }, [counter, time]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, oneMinute);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <>{timeAgo}</>;
}

TimeStamp.propTypes = {
  time: PropTypes.instanceOf(Date)
}

export default TimeStamp