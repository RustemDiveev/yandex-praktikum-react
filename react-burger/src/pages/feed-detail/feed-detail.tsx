import { useParams } from "react-router-dom"

import styles from "./feed-detail.module.css"

const FeedDetail = () => {
  const { number } = useParams()

  return (
    <div className={styles.div}>
      <h1>Diveev Test</h1>
    </div>
  )
}

export default FeedDetail