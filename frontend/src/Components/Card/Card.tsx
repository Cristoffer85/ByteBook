import './Card.css'

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card = ({companyName, ticker, price}: Props) => {
  return (
    <div className="card">
      <img
        src="https://picsum.photos/id/237/200/300"
        alt="Image"
      />
      <div className="details">
        <h2>{companyName} ({ticker})</h2>
        <p>${price}</p>
      </div>
      <p className="info">
        Hoola bandoola hejsan hoppsan vad kul det här är!
      </p>
    </div>
  );
};

export default Card