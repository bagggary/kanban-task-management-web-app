import React from 'react'

export default function BoardDelete({data , selectedBoard , setData  , setFormAppear}) {


  function deleteBoard () {

    setData((prev) => {
      const modifiedBoard = [...prev]
      modifiedBoard.splice(selectedBoard , 1)
      return modifiedBoard
    })
    setFormAppear(prev => {
      return {
        ...prev ,
        deleteBoard : false,
        overlay :  false
      }
    })
  }

  function cancelDeletion(){
    setFormAppear(prev => {
      return {
        ...prev ,
        deleteBoard : false,
        overlay :  false
      }
    })

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
