import React from 'react'

export default function BoardDelete({  data, selectBoard , setData  , setFormAppear , setSelectedBoard}) {



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
    if(data.length - 1 <= 0){
      return 
    }
    setData((prev) => {
      const modifiedBoard = [...prev]
      modifiedBoard.splice(selectBoard , 1)
      return modifiedBoard
    })
    if(selectBoard == data.length - 1){
      setSelectedBoard(data.length - 2)
    } 

    modifyAppear()
  }

  function cancelDeletion(){
    modifyAppear()

  }
  return (
    <div className="overlay">
        <div className='delete board-dele'>
            <h1>Delete this board?</h1>
            <p>Are you sure you want to delete the '<span>{data[selectBoard].name}</span>' board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className='delete-options'>
                <button onClick = {deleteBoard}>Delete</button>
                <button onClick={cancelDeletion}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
