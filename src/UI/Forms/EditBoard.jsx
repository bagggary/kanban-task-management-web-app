import React, { useState , useEffect } from 'react'

export default function EditBoard ({formAppear , data , selectBoard , setData}) {
    const [dataState , setDataState] = useState(null)
    useEffect(()=> {
        setDataState(data[selectBoard])
    } , [data])

    function addCol(){
        const newBoardCol = {name: "", tasks: []}
        const newArray = data.map((item, i) => {
            if (selectBoard === i) {
              return { ...item, columns: [...item.columns , newBoardCol] };
            } else {
              return item;
            }
        });
        setData(newArray);
        validate()
        // setDataState((prev) => {
        //     return {
        //         ...prev ,
        //         columns : [...prev.columns , newBoardCol]
        //     }
        // });
        // setData((prev) => {
        //     return {
        //         ...prev ,
        //         columns : [...prev.columns , newBoardCol]
        //     }
        // })
        // setBoardObj((prev) => {
        //     return {
        //         ...prev ,
        //         columns : [...prev.columns , newBoardCol]
        //     }
        // })
    }
    const validate = () => {
        const errors = {}
        if(!dataState.name) {
            errors.name = "can\'t be empty"
            errors.nameError = true
        }
        dataState.columns.forEach((col , index) => {
            if(!col.name) {
                errors[`col-${index}`] = 'Can\'t be empty'
                errors[`err-${index}`] = true
            }
        })
        console.log(errors)
    }

  return (
    <div className='add-new edit transition'  >
         <h1>Edit Board</h1>
        <form>
            <div className={`f-tit ${true && `error`}`}>
                <label htmlFor="title">BoardName</label>
                <input type="text" name='name' id='title' placeholder='e.g. Take coffee break'   value = {data[selectBoard].name}/> 
                {/* <p>{formErrors.name && formErrors.name}</p> */}
                {/* onChange={titleHandle} */}
                 </div>
            <div className='f-sub'> 
                <label >BoardColumns</label>
                <div className='sub-styles'>
                {data[selectBoard].columns && data[selectBoard].columns.map((col , index) => {
                    return (
                        // className={`sub-${index} ${formErrors[`err-${index}`] && `error`}`}
                        // onChange={(e) => handleAddBoard(e, index)}
                        // onClick={revomveCol }
                        <div key={index} className={`sub-1`} id={index}>
                        <input type="text" id={index}  placeholder={`e.g. Col-${index + 1} `}  value = {col.name} />
                        <svg  width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g  fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                        {/* <p> {formErrors[`col-${index}`] && formErrors[`col-${index}`]}</p> */} </div>
                    )
                })}
                </div>
                <button type='button' onClick={addCol}> + Add New Column</button>
            </div>
            <button type='button'>Create New Board</button>
        </form> 
    </div>
  )
}
