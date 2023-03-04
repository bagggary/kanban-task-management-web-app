import React, { useState , useEffect, useRef } from 'react'
import useToggle from '../../hooks/useToggle'

export default function AddTask({ selectBoard , formAppear , data , setData , setFormAppear }) {

    const [show , toggleShow ] = useToggle(false)
    const [dataTasks , setDataTasks] = useState([])
    const [formErrors, setFormErrors] = useState({});
    const taskRef = useRef(null)
    const [status , setStatus] = useState(data[selectBoard].columns[0].name)
    const [taskObj , setTaskObj] = useState( {
        title : '' ,
        description : '' ,
        status : status,
        subtasks : [
            {title : "" , isCompletd : false} ,
            {title : "" , isCompletd : false}
        ] ,
    })

    console.log(taskObj)
    const [sub , setSub] = useState([
        {title : '' , placeholder : 'e.g. Make coffee'},
        {title : '' , placeholder : 'e.g. Drink coffee & smile'}
    ])


    useEffect(()=>{
        function outsideClick(e){
            if(taskRef.current && !taskRef.current.contains(e.target)){
                setFormAppear(  prev => {
                    return {
                        ...prev , 
                        task : false,
                        overlay : false
                    }
                }) ;
            }
        }
        document.addEventListener("mousedown" , outsideClick)
        return () => {
            document.removeEventListener('mousedown' , outsideClick)
        }
    } , [taskRef])



    useEffect(()=> {
        setDataTasks(data[selectBoard].columns)
        setTaskObj((prev) => {
            return {
                ...prev ,
                status :  data[selectBoard].columns[0].name
            }
        })
    } , [])
    
    function titleHandle(e) {
        const {name , value} = e.target
        setTaskObj((prev) => {
            return {
                ...prev , 
                [name] : value
            }
        })
    }

//function to handle add the value of each subtasks onChange on each input field
    const handleAddTask = (e, index ) => {
        const subtasks = [...taskObj.subtasks];
        subtasks[index].title = e.target.value;
        setTaskObj( prev => {
            return (
                {
                ...prev,
                subtasks }
            )
            } )  
         }
// function to handle adding newSubTask
function addSubTask(){
    const newSub = {value : '' , placeholder : `e.g. New Subtask `}
    const newSubTasks =  {title : "" , isCompletd : false}
    setSub((prev) => {
        return [
            ...prev ,
            newSub
    ]
    })
    setTaskObj((prev) => {
        return {
            ...prev ,
            subtasks : [...prev.subtasks , newSubTasks]
        }
    })
}
// adding validation to each input field to ensure that all input fileds are filled and then added to the main data set
const validate = () => {
    const errors = {};
    if (!taskObj.title) {
      errors.title = "Can\'t be empty";
      errors.titleError = true
    }
    taskObj.subtasks.forEach((tsk , index) => {
        if(!tsk.title) {
            errors[`sub-${index}`] = 'Can\'t be empty'
            errors[`err-${index}`] = true
        }
    })
    return errors;
};



function handleStatus(e){
    setStatus(e.target.textContent)
    setTaskObj((prev) => {
       return {
           ...prev ,
           status : status
       }
    })
}

status

const handleStatusChange = (event) => {
    const selectedStatus = event.target.textContent;
    setTaskObj((prevTaskObj) => ({
      ...prevTaskObj,
      status: selectedStatus
    }));
  };

// handling submit function to set the main data to data object json
const handleSumbit = (e)=> {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
        setData((prev) => {
            let newData = [...prev]
            prev.map((col , index) => {
                if(selectBoard === index){
                    let updatedColumns = [...col.columns];
                    const columnIndex = updatedColumns.findIndex(col => col.name === taskObj.status);
                    updatedColumns[columnIndex] = {...updatedColumns[columnIndex] , tasks : [...updatedColumns[columnIndex].tasks , taskObj]}
                    newData[selectBoard] = {...prev[selectBoard] , columns : updatedColumns}
                }
            })
            return newData
        })
        setFormAppear(prev => {
            return {
                ...prev,
                task: false,
                overlay: false
            }
        });
    } else {
        setFormErrors(errors);
    }
} 
function removeSub(id){
    if(sub.length <= 2){
        return 
    }
    const newSubtaskData = [...sub];
    newSubtaskData.splice(id, 1);
    setSub(newSubtaskData)
}
  return (
    <div className="overlay" ref={taskRef}>
         <div className='add-new task'>
        <h1>Add New Task</h1>
        <form>
            <div className={`f-tit ${formErrors.titleError && `error`}`}>
                <label htmlFor="title">Title</label>
                <input type="text" id='title' name = 'title'  placeholder='e.g. Take coffee break' onChange={(e) => titleHandle(e)}/>
                <p>{formErrors.title && formErrors.title}</p>
            </div>
            <div className='f-des'>
                <label htmlFor="des">Description</label>
                 <textarea id='des' name='description' placeholder='e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little.' onChange={(e) => titleHandle(e)}></textarea>
            </div>
            <div className='f-sub'>
                <label htmlFor="sub">Subtask</label>
                <div className="sub-styles task">
                    {sub && sub.map((subtsk , index) => {
                        return (
                            <div className={`sub-${index} ${formErrors[`err-${index}`] && `error`}`}>
                         <input type="text" id='sub' placeholder={subtsk.placeholder} onChange = {(e) => handleAddTask(e , index)}/>
                         <svg onClick={(e) => removeSub(index) } width="15" height="15" xmlns="http://www.w3.org/2000/svg" ><g  fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                         <p> {formErrors[`sub-${index}`] && formErrors[`sub-${index}`]}</p>
                     </div>
                             )
                    })}
                </div>
                <button type='button' onClick={addSubTask}> + Add New Subtask</button>
            </div>
            {/* this has to change to cover the status of each board created to do so .  */}
            <div className='f-stat' onClick={toggleShow}>
                <div className='stat-title' >{taskObj.status}</div>
                <span ><svg width="10" height="7" xmlns="http://www.w3.org/2000/svg" ><path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4"/></svg></span>
                <div className={`stat-dropdown ${show ? 'show' : ''} transition`} >
                    <ul>{dataTasks && dataTasks.map((tsk , index) => {
                        return (
                            <li key={index} id = {index} onClick = {handleStatusChange}  >{tsk.name}</li>
                        )
                    })}
                    </ul>
                </div>
            </div>
            <button type='button' onClick={(e) => handleSumbit(e)}>Create Task</button>
        </form>
    </div>
    </div>
  )
}
