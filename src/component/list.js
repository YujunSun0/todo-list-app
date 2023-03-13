import React from 'react';
import TodoItem from './item';

const TodoItemList = ({ todoItemList }) => {

    return (
      <div>
        <ul>
          {todoItemList.map((item, idx) => {
            return <TodoItem key={item.id} item={item} />;
          })}
        </ul>
      </div>
    );
}

export default TodoItemList;