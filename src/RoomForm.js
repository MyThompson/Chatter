import React, { Component } from 'react'

class RoomForm extends Component {
  render() {
    return (
      <div className="RoomForm">
        <main>
          <h2>Create a room</h2>
          <form>
            <p>
              <label htmlFor="name">
                Room Name
              </label>
              <input
                autoFocus
                required
                type="text"
                name="name"
              />
            </p>

            <p>
              <label htmlFor="description">
                Description
              </label>
              <input
                type="text"
                name="description"
              />
            </p>
            <div>
              <button
                type="submit"
              >
                Create Room
              </button>
            </div>
          </form>
        </main>
      </div>
    )
  }
}

export default RoomForm