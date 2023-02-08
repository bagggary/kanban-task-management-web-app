import React , {useState} from 'react'

export default function ({data , setData , updateBoard}) {
    const [boardObj , setBoardObj] = useState( { name: "" , columns : [
        {name: "", tasks: []}
         ,{name: "", tasks: []}
    ]})

    function titleHandle(e) {
        const {name , value} = e.target
        setBoardObj((prev) => {
            return {
                ...prev , 
                [name] : value
            }
        })
    }

    const handleAddBoard = (e, index ) => {
        const {name , value  } = e.target
        const columns = [...boardObj.columns];
        columns[index].name =  value;
        setBoardObj( prev => {
            return (
                {
                ...prev,
                columns }
                )
            }
                ) };

                const handleSumbit = (e)=> {
                    e.preventDefault()
                    setData(prev => {
                        return [
                            ...prev.boards,
                            prev.boards.push(boardObj)
                        ]
                    })
                }


  return (
         <div className='add-new board'>
        <h1>Add New Board</h1>
        <form>
            <div className='f-tit'>
                <label htmlFor="title">Title</label>
                <input type="text" name='name' id='title' placeholder='e.g. Take coffee break'  onChange={titleHandle}/>
            </div>
            <div className='f-sub'>
                <label >Columns</label>
                <div className='sub - 1'>
                    <input type="text" id='1'  placeholder='e.g. Col 1'  onChange={(e) => handleAddBoard(e, 0)} />
                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                </div>
                <div className='sub - 2'>
                    <input type="text" id='2'  placeholder='e.g. Col 2'  onChange={(e) => handleAddBoard(e, 1)}/>
                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                </div>
                <button type='button'> + Add New Column</button>
            </div>

            <button type='button' onClick={handleSumbit}>Create New Board</button>
        </form>
    </div>
  )
}
