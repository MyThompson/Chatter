import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Sidebar from './Sidebar'
import Chat from './Chat'
import RoomForm from './RoomForm'
import base from './base'

class Main extends Component {
  state = {
    room: {},
    rooms: {},
  }

  componentDidMount() {
    this.roomsRef = base.syncState(
      'rooms',
      {
        context: this,
        state: 'rooms',
        defaultValue: {
          general: {
            name: 'general',
            description: 'Chat about whatever',
          },
        },
        then: this.setRoomFromRoute,
      }
    )
  }

  componentDidUpdate(prevProps) {
    const { roomName } = this.props.match.params
    if (prevProps.match.params.roomName !== roomName) {
      this.setRoomFromRoute()
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.roomsRef)
  }

  setRoomFromRoute = () => {
    const { roomName } = this.props.match.params
    if (roomName) {
      this.setCurrentRoom(roomName)
    }
  }

  addRoom = room => {
    const rooms = {...this.state.rooms}
    rooms[room.name] = room

    this.setState({ rooms })
  }

  removeRoom = roomName => {
    const rooms = {...this.state.rooms}
    rooms[roomName] = null

    this.setState(
      { rooms },
      this.loadValidRoom
    )
  }

  setCurrentRoom = roomName => {
    const room = this.state.rooms[roomName]

    if (room) {
      this.setState({ room })
    } else {
      this.loadValidRoom()
    }
  }

  loadValidRoom = () => {
    const roomNames = Object.keys(this.state.rooms)
    if (roomNames.length > 0) {
      const roomName = roomNames[0]
      this.props.history.push(`/chat/rooms/${roomName}`)
    }
  }

  roomIsLoaded() {
    return this.state.room.name
  }

  render() {
    return (
      <div className="Main" style={styles}>
        <Switch>
          <Route
            path="/chat/new-room"
            render={(navProps) => (
              <RoomForm
                addRoom={this.addRoom}
                {...navProps}
              />
            )}
          />
          <Route
            path="/chat/rooms/:roomName"
            render={() => (
                this.roomIsLoaded()
                  ? <Fragment>
                      <Sidebar
                        user={this.props.user}
                        signOut={this.props.signOut}
                        rooms={this.state.rooms}
                      />
                      <Chat
                        user={this.props.user}
                        room={this.state.room}
                        removeRoom={this.removeRoom}
                      />
                    </Fragment>
                  : <div>Loading...</div>
            )}
          />
          <Route render={() => (
            <Redirect to="/chat/rooms/general" />
          )} />
        </Switch>

      </div>
    )
  }
}

const styles = {
  display: 'flex',
  alignItems: 'stretch',
  height: '100vh',
}

export default Main