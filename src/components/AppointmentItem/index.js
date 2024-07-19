import './index.css'

const AppointmentItem = props => {
  const {bookApp, appIsFav} = props
  const {title, isFavourite, id, date} = bookApp
  const starImgUrl = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarImage = () => {
    appIsFav(id)
  }
  return (
    <li>
      <div className="list-container">
        <p>{title}</p>
        <button
          onClick={onClickStarImage}
          type="button"
          className="star-btn"
          data-testid="star"
        >
          <img src={starImgUrl} alt="star" className="star-img" />
        </button>
      </div>
      <p>{date}</p>
    </li>
  )
}

export default AppointmentItem
