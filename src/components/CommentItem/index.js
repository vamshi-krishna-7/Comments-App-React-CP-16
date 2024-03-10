// Write your code here

import './index.css'

const CommentItem = props => {
  const {commentDetails, onToggleLike, onDeleteComment} = props
  const {name, comment, isLiked, date, id, initialClassName} = commentDetails

  const onclickLikeBtn = () => {
    onToggleLike(id)
  }

  const onclickDelete = () => {
    onDeleteComment(id)
  }

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeTextClassName = isLiked ? 'btnClassName' : ''

  return (
    <li className="comment-item">
      <div className="comment-container">
        <p className={`name-initial ${initialClassName}`}>{name[0]}</p>
        <div className="name-container">
          <div className="username-time-container">
            <p className="name">{name}</p>
            <p className="time">{date}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="icons-container">
        <button type="button" className="btn" onClick={onclickLikeBtn}>
          <img src={likeImgUrl} alt="like-img" className="like-img" />
          <span className={`like-text ${likeTextClassName}`}>Like</span>
        </button>
        <button
          type="button"
          className="btn"
          onClick={onclickDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="btn-img"
          />
        </button>
      </div>
      <hr className="break-line" />
    </li>
  )
}

export default CommentItem
