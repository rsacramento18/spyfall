import React, {useState} from "react";

const PlayerBox = (props: any) => {

  const [borderRed, setBorderRed] = useState(false);

  const changeBorderRed = () => setBorderRed(!borderRed);

  const allClasses = borderRed ? "w-full mx-auto my-2 text-center bg-background border border-red text-gray-400 rounded" : "w-full mx-auto my-2 text-center bg-background border text-gray-400 rounded";

  return (
    <div className={allClasses} onClick={changeBorderRed}>
      <h1 className="text-lg uppercase font-bold py-2">{props.player.playerName}</h1>
    </div>
  );

}

export default PlayerBox;
