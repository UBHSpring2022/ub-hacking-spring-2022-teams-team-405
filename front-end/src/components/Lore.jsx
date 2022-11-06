import FishImg from "../assets/Fish2.png";
import Nono from "../assets/UraniumThing.png";
import "../styles/Landing.scss";
const Lore = () => {
  return (
    <div className="Lore">
      <h1 id="Lore" className="Lore-title">
        Lore
      </h1>
      <img src={FishImg} alt="Fish" />

      <p className="Lore-Description1">
        Once fluttering through the seas, <br />
        quickly reduced to
        <span className="Lore-Description-dra1">nothing...</span>
      </p>
      <p className="Lore-Description2">
        Only the worst and
        <span className="Lore-Description-dra2">worst of the worst</span> <br />
        to have caused such madness.
      </p>
      <p className="Lore-Description3">
        <span className="Lore-Description-dra3">Tech Extremists</span> and
        <span className="Lore-Description-dra3">Zara employees...</span>
      </p>

      <h1 className="Lore-Title2">UNCLE MINING</h1>
      <p className="Lore-Description4">
        Meant to protect the creatures to boost Mongolian GDP,
      </p>
      <p className="Lore-Description5">
        Uncles were captured and stored in a uranium bunker
      </p>
      <p className="Lore-Description6">
        By the tech extremists and forced to mine rare earth metals
      </p>
      <img className="Lore-Img2" src={Nono} alt="Nono" />

      <h1 className="Lore-Title3">END GAME</h1>
      <p className="Lore-Description7">
        An even more efficient system had to be created which resulted in the
        rare fish market soon to be create its own version of the NASDAQ
      </p>
      <p className="Lore-Description8">
        Zara employees forced the uncles to continue mining rare earth metals
        and prompted the extinction of the Rare fish
      </p>
      <p className="Lore-Description9">Rare fish were gone...</p>

    </div>
  );
};
export default Lore;
