import styles from "./Card.module.css";

interface Props {
  time: string;
  srcImg: string;
  altImg: string;
  temperature: number;
  forcastDate: string;
}

const ForcastCards = ({
  time,
  temperature,
  altImg,
  srcImg,
  forcastDate,
}: Props) => {
  return (
    <div className={styles.forcastCardContainer}>
      <p className={styles.forcastDateStyle}>{forcastDate}</p>
      <p>{time}</p>
      <img src={srcImg} alt={altImg} style={{ width: 50, height: 50 }} />
      <p>{temperature}&deg;</p>
    </div>
  );
};

export default ForcastCards;
