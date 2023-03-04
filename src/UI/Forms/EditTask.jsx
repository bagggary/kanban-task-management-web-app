import React, { useState , useRef , useEffect} from 'react'
export default function EditTask({task , selectedBoard , setformAppear , setData , data , formAppear}) {

  const [editTask , setEditTask] = useState(task)
  const [formErrors, setFormErrors] = useState({});
  const [sub , setSub] = useState(editTask.subtasks)
  console.log('')
  const editRef = useRef(null)
  useEffect(() => {
      function outsideClick(event) {
        if (editRef.current && !editRef.current.contains(event.target)) {
          setformAppear(prev => {
              return {
                  ...prev,
                  editTask: false,
                  overlay: false ,
                  subOption : false 
              }
          });
        }
      }
      document.addEventListener('mousedown', outsideClick);
      return () => {
        document.removeEventListener('mousedown', outsideClick);
      };
    }, [editRef]); 


  const handleChanges = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
        setData((prev) => {
            let newData = [...prev]
            prev.map((col , index) => {
                if(selectedBoard === index){
                    let updatedColumns = [...col.columns];
                    const columnIndex = updatedColumns.findIndex(col => col.name === editTask.status);
                    const editedTask = [...updatedColumns[columnIndex].tasks]
                    const taskIndex = editedTask.findIndex(tsk => tsk.title === task.title)
                    editedTask[taskIndex] = editTask
                    updatedColumns[columnIndex] = {...updatedColumns[columnIndex] , tasks : editedTask}
                    newData[selectedBoard] = {...prev[selectedBoard] , columns : updatedColumns}  
                }
            })
            return newData
        })
        setformAppear(prev => {
            return {
                ...prev,
                editTask: false,
                overlay: false,
                subOption : false
            }
        });
    } else {
        setFormErrors(errors);
    }
  }

  function titleHandle(e) {
    const {name , value} = e.target
    setEditTask((prev) => {
        return {
            ...prev , 
            [name] : value
        } 
    })
}

  const handleAddTask = (e, index ) => {
    const subtasks = [...editTask.subtasks];
    subtasks[index].title = e.target.value;
    setEditTask( prev => {
        return (
            {
            ...prev,
            subtasks }
        )
        })  
     }

  function addSubTask(){
    const newSub = {value : '' , placeholder : `e.g. New Subtask `}
    const newSubTasks =  {title : "" , isCompletd : false}
    setSub((prev) => {
        return [
            ...prev ,
            newSub
    ]
    })
    setEditTask((prev) => {
        return {
            ...prev ,
            subtasks : [...prev.subtasks , newSubTasks]
        }
    })
}

function removeSub(id){
  if(sub.length <= 2){
      return 
  }
  const newSubtaskData = [...sub];
  newSubtaskData.splice(id, 1);
  const newEditedSubtaskdata = [...editTask.subtasks]
  newEditedSubtaskdata.splice(id, 1)
  setEditTask(prev => {
    return {
      ...prev ,
      subtasks : newEditedSubtaskdata
    }
  })
  setSub(newSubtaskData)
}



  const validate = () => {
    const errors = {};
    if (!editTask.title) {
      errors.title = "Can\'t be empty";
      errors.titleError = true
    }
    editTask.subtasks.forEach((tsk , index) => {
        if(!tsk.title) {
            errors[`sub-${index}`] = 'Can\'t be empty'
            errors[`err-${index}`] = true
        }
    })
    return errors;
};

  return (
    <div className="overlay" ref={editRef}>
    <div className='add-new task'>
   <h1>Edit Task</h1>
   <form>
       <div className={`f-tit ${formErrors.titleError && `error`}`}>
           <label htmlFor="title">Title</label>
           <input type="text" id='title' name = 'title'  defaultValue={task.title}  onChange={(e) => titleHandle(e)} />
           <p>{formErrors.title && formErrors.title}</p>
       </div>
       <div className='f-des'>
           <label htmlFor="des">Description</label>
            <textarea id='des' defaultValue={task.description} name='description' placeholder='e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little.'  onChange={(e) => titleHandle(e)} ></textarea>
       </div>
       <div className='f-sub'>
           <label htmlFor="sub">Subtask</label>
           <div className="sub-styles task">
               {sub && sub.map((subtsk , index) => {
                   return (
                       <div className={`sub-${index} ${formErrors[`err-${index}`] && `error`}`}>
                    <input type="text" id='sub' placeholder={ subtsk.placeholder && subtsk.placeholder} onChange = {(e) => handleAddTask(e , index)} value = {subtsk.title}/>
                    <svg onClick={(e) => removeSub(index) } width="15" height="15" xmlns="http://www.w3.org/2000/svg" ><g  fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                    <p> {formErrors[`sub-${index}`] && formErrors[`sub-${index}`]}</p>
                </div>
                 )
               })}
           </div>
           <button type='button' onClick={addSubTask} > + Add New Subtask</button>
       </div>
       {/* this has to change to cover the status of each board created to do so .  */}
       <div className='status'>
       <h1>Current Status</h1>
       <div className='f-stat' >
       {/* onClick={toggleShow} */}
       <div className='stat-title' >{editTask.status}</div>
           {/* <span ><svg width="10" height="7" xmlns="http://www.w3.org/2000/svg" ><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4"/></svg></span> */}
           {/* <div className={`stat-dropdown`} >
            {/* ${show ? 'show' : ''} transition */}
               {/* <ul>{dataTasks && dataTasks.map((tsk , index) => {
                   return (
                       <li key={index} id = {index} onClick = {handleStatusChange}  >{tsk.name}</li>
                   )
               })}
               </ul> */}
           {/* </div> */} 
       </div>
       </div>
       <button type='button' onClick={handleChanges}>Save changes</button>

   </form>
</div>
</div>
  )
}
