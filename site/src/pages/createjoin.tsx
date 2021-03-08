import React  from 'react';
import { NavLink, useHistory } from "react-router-dom";

const CreateJoin = () => {

  const history = useHistory();
  const handleClick = () => history.push('/creategame');

  return (
    <div>
      Create join page
      <div>
      <button type="button" onClick={handleClick}>Create game!</button>
      </div>

      <div>
      <button type="button" onClick={handleClick}>Join Game!</button>
      </div>
    </div>
  );
}

export default CreateJoin;

