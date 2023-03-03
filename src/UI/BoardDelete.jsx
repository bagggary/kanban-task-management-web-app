import React from 'react'

export default function BoardDelete({data , selectedBoard , setData  , setFormAppear}) {



  function modifyAppear(){
    setFormAppear(prev => {
      return {
        ...prev ,
        deleteBoard : false,
        overlay :  false
      }
    })
  }

  function deleteBoard () {
    setData((prev) => {
      const modifiedBoard = [...prev]
      modifiedBoard.splice(selectedBoard , 1)
      return modifiedBoard
    })
    modifyAppear()
  }

  function cancelDeletion(){
    modifyAppear()

  }
  return (
    <div className="overlay">
        <div className='delete board-dele'>
            <h1>Delete this board?</h1>
            <p>Are you sure you want to delete the '<span>Platform Launch</span>' board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className='delete-options'>
                <button onClick = {deleteBoard}>Delete</button>
                <button onClick={cancelDeletion}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
