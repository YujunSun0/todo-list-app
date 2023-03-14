import React from 'react';
import TodoItem from './item';

const TodoItemList = ({ todoItemList, onTodoItemClick, onRemoveClick }) => {
  return (
    <div>
      <ul>
        {todoItemList.map((item, idx) => {
          return (
            <TodoItem
              key={item.id}
              item={item}
              onTodoItemClick={onTodoItemClick}
              onRemoveClick={onRemoveClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoItemList;