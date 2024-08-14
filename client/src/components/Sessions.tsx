import { FC } from "react";

type SessionProps = {
    sessions: number;  
};

const Sessions: FC<SessionProps> = ({ sessions }) => {
  return (
    <div>
        Active Sessions: {sessions}
    </div>
  )
}

export default Sessions
