import React, {Component} from 'react'

class MessageForm extends Component {
    render(){
        return(
            <form classname="MessageForm">
            <input 
            autoFocus
            required
            type ="text"
            name="body"
            placeholder="Type a message"
            />
            <button type="submit">
                Send
            </button>
            </form>
        )
    }
}

export default MessageForm