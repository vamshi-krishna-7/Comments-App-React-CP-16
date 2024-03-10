import {Component} from 'react'
import './index.css'

import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    commentsList: [],
    nameInput: '',
    commentInput: '',
    commentsCount: 0,
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: formatDistanceToNow(new Date()),
      initialClassName: initialBackgroundColorClassName,
      isLiked: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      commentsCount: prevState.commentsCount + 1,
      nameInput: '',
      commentInput: '',
    }))
  }

  onToggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => id !== eachComment.id,
      ),
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  render() {
    const {commentsCount, nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="comment-head">Comments</h1>
          <div className="form-image-container">
            <form className="form-container" onSubmit={this.onAddComment}>
              <p className="say-some-para">
                Say something about 4.0 Technologies
              </p>
              <input
                placeholder="Your Name"
                className="name-input"
                onChange={this.onChangeName}
                value={nameInput}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                rows="6"
                cols="30"
                onChange={this.onChangeComment}
                value={commentInput}
              />
              <button className="add-button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="comments-img"
              alt="comments"
            />
          </div>
          <hr className="break-line" />

          <p className="comments-count-text">
            <span className="comment-counts">{commentsCount}</span> Comments
          </p>
          <ul className="comment-list-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                onToggleLike={this.onToggleLike}
                onDeleteComment={this.onDeleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
