import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import TaskList from '../TaskList/TaskList'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [Id, setId] = useState(1)
  const [filter, setFilter] = useState('All')

  const addTask = (description) => {
    const newTask = {
      id: Id,
      label: description,
      checked: false,
      createdDate: Date.now(),
    }
    setTasks([...tasks, newTask])
    setId(Id + 1)
  }

  const CompletedTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, checked: !task.checked } : task)))
  }

  const DeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const EditTask = (id, newLabel) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, label: newLabel } : task)))
  }

  const ClearComplited = () => {
    setTasks(tasks.filter((task) => !task.checked))
  }

  const CountTask = tasks.filter((task) => !task.checked).length

  const SelectFilterTask = tasks.filter((task) => {
    if (filter === 'All') return true
    if (filter === 'Active') return !task.checked
    if (filter === 'Completed') return task.checked
    return false
  })

  return (
    <>
      <NewTaskForm onAddTask={addTask} />
      <section className="main">
        <TaskList
          todos={SelectFilterTask}
          onCompletedTask={CompletedTask}
          onDeleteTask={DeleteTask}
          onEditTask={EditTask}
        />
        <Footer
          CountTask={CountTask}
          onClearComplited={ClearComplited}
          onChangeFilter={setFilter}
          selectFilter={filter}
        />
      </section>
    </>
  )
}

export default App
