import '../App.css';

const Card = ({ fullName, address, interests, imageUrl }) => {
  return (
    <div className='card'>
      <div className='cardImage'>
        <img
          src={imageUrl}
          alt={`${fullName} ${address}`}
        />
      </div>
      <div className='cardContent'>
        <div className='cardContentPersonal'>
          <h2 className='nameUser'>{fullName}</h2>
          <p className='addressUser'>{address}</p>
        </div>
        <div className='cardContentInterests'>
          {interests?.map(interest => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
