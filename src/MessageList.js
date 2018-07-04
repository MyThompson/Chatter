import React from 'react'

import Message from './Message'

const MessageList = (props) => {
  return (
    <div className="MessageList" style={styles.MessageList}>
      {
        props.messages.map(msg => (
          <Message message={msg} key={msg.id} />
        ))
      }
    </div>
  )
}

const styles={
  MessageList: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: '1rem',
    overflowY: 'scroll',
  },
  
  roomAnnouncement: {
    padding: '2rem 1rem',
  },
  
  h3: {
    fontSize: '1.5rem',
  },
}

export default MessageList