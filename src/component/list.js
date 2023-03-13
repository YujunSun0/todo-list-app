import React from 'react';

const TodoItemList = ({ todoItemList }) => {

    return (
        <div>
          <ul>
            {
              todoItemList.map((item, idx) => {
                  return (
                      <li key={idx}>{item.todoItemContent}</li>
                )   
             })
            }
          </ul>
        </div>
    )
}

export default TodoItemList;