import { IComment } from '../../../interfaces/Comment'
import classes from './styles.module.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Comment = ({ comment }: { comment: IComment }) => {
  return (
    <div className={classes.comments + " border border-black me-1 mb-3 p-1"} style={{width: '98%'}}>
        <div className="fw-bold">{comment.user.username}</div>
        <div className="ms-3">{comment.text}</div>
    </div>
  )
}

export default Comment
