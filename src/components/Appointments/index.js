import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

const initialAppointmentsList = []

class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentsList,
    title: '',
    date: '',
    isFavourite: false,
  }

  onFilter = () => {
    const {isFavourite} = this.state
    this.setState({isFavourite: !isFavourite})
  }

  filterFavouriteList = () => {
    const {appointmentsList, isFavourite} = this.state
    if (isFavourite) {
      return appointmentsList.filter(eachApp => eachApp.isFavourite === true)
    }
    return appointmentsList
  }

  appIsFav = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isFavourite: !eachApp.isFavourite}
        }
        return eachApp
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isFavourite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {title, date} = this.state
    const getFilteredLists = this.filterFavouriteList()
    return (
      <div className="container">
        <div className="card">
          <div className="input-container">
            <form onSubmit={this.onAddAppointment}>
              <h1>Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                onChange={this.onChangeTitle}
                placeholder="Title"
                value={title}
                id="title"
              />
              <label htmlFor="date">DATE</label>
              <input
                type="date"
                onChange={this.onChangeDate}
                value={date}
                id="date"
              />
              <button type="submit" className="add-app-btn">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="app-list-container">
            <h1>Appointments</h1>
            <button type="button" onClick={this.onFilter}>
              Starred
            </button>
          </div>
          <ul>
            {getFilteredLists.map(eachApp => (
              <AppointmentItem
                key={eachApp.id}
                bookApp={eachApp}
                appIsFav={this.appIsFav}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
