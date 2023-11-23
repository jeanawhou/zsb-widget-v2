import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getTimeDifference } from 'src/utils/datetime';

const TimeStamp = props => {
  const oneMinute = 1000 * 60;
  const oneHour = oneMinute * 60;
  const { time } = props
  const [timeAgo, setTimeAgo] = useState(getTimeDifference(time));
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (timeAgo !== getTimeDifference(time)) {
      setTimeAgo(getTimeDifference(time));
    }
  }, [counter, time]);

  useEffect(() => {
    const minuteAgo = timeAgo && (timeAgo.endsWith('seconds ago') || timeAgo.endsWith('m ago'))
    const intervalId = setInterval(() => {
      if (minuteAgo) {
        setCounter((prevCounter) => prevCounter + 1);
      } else if (timeAgo && timeAgo.endsWith('h ago')) {
        setCounter((prevCounter) => prevCounter + 1);
      }
    }, minuteAgo ? oneMinute : oneHour);

    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  return <>{timeAgo}</>;
}

TimeStamp.propTypes = {
  time: PropTypes.instanceOf(Date)
}

export default TimeStamp