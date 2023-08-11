import { CSSProperties, FC, useContext, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { SocketContext } from '../../context/socket/socket.context';
import { PlayTime } from './enums/play-time.enum';
import { TimeConstants } from './enums/time.enum';

interface ITimerProps {
  endTimestamp?: Date;
  style: CSSProperties;
  roomId?: string;

  onExpire: () => void;
}

export const Timer: FC<ITimerProps> = ({
  endTimestamp = new Date(
    Date.now() +
      PlayTime.SECONDS * TimeConstants.SECOND +
      PlayTime.MINUTES * TimeConstants.MINUTE * TimeConstants.SECOND
  ),
  style,
  onExpire,
  roomId,
}) => {
  const socket = useContext(SocketContext);
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp: endTimestamp,
      autoStart: true,
      onExpire,
    });

  useEffect(() => {
    function onOtherPlayerFinished(body: { remainingTimeInSeconds: number }) {
      restart(
        new Date(
          Date.now() + body.remainingTimeInSeconds * TimeConstants.SECOND
        )
      );
    }

    socket.on('other_player_finished', onOtherPlayerFinished);

    return () => {
      socket.off('other_player_finished', onOtherPlayerFinished);
    };
  }, [restart, socket]);

  return (
    <>
      <div style={style}>
        <span>{minutes.toString().length === 1 ? `0${minutes}` : minutes}</span>
        :
        <span>{seconds.toString().length === 1 ? `0${seconds}` : seconds}</span>
      </div>
    </>
  );
};
