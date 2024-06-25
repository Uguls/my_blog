import "../../styles/Todo/TodoItem.css";
import {React, memo} from "react";

const TodoItem = ({id, isDone, content, date, onUpdate, onDelete}) => {

	const onChangeCheckbox = () => {
		onUpdate(id);
	}

	const onClickDeleteButton = () => {
		onDelete(id);
	};

	return (
		<div className={"TodoItem"}>
			<input
				onChange={onChangeCheckbox}
				checked={isDone}
				type={"checkbox"}
			/>
			<div className={"content"}>{content}</div>
			<div className={"date"}>
				{new Date().toLocaleDateString()}
			</div>
			<button onClick={onClickDeleteButton}>삭제</button>
		</div>
	);
};

export default memo(TodoItem);