import React from 'react';
import TodoItem from './item';

const TodoItemList = ({ todoItemList, onTodoItemClick }) => {
  return (
    <div>
      <ul>
        {todoItemList.map((item, idx) => {
          return (
            <TodoItem
              key={item.id}
              item={item}
              onTodoItemClick={onTodoItemClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoItemList;