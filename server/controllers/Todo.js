const { Todo, User } = require("../models");
const e = require("express");

exports.uploadTodo = async (req, res, next) => {
  if (!req.body.content) {
    return res.status(400).json("내용을 입력해주세요");
  }

  try {
    const todo = await Todo.create({
      content: req.body.content,
      UserId: req.user.id,
      isDone: false,
    });

    res.status(200).json("Todo가 성공적으로 등록되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).json("서버 에러");
  }
};

exports.updateTodo = async (req, res, next) => {
  const TodoId = req.params.id;
  try {
    const todo = await Todo.findOne({ where: { id: TodoId } });
    if (!todo) {
      return res.status(404).json("Todo가 존재하지 않습니다.");
    }
    if (todo.UserId !== req.user.id) {
      return res.status(400).json("Todo 수정 권한이 없습니다.");
    }

    await Todo.update({ content: req.body.content }, { where: { id: TodoId } });

    res.status(200).json("Todo가 성공적으로 수정되었습니다.");
  } catch (err) {
    console.log(err);
    res.status(500).json("글 수정 오류");
  }
};

exports.TodoList = async (req, res) => {
  try {
    // posts 테이블에서 id, UserId, createdAt 컬럼 가져오기
    const todos = await Todo.findAll({
      attributes: ["id", "UserId", "createdAt", "content"],
    });
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json("서버 에러");
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    if (!todo) {
      return res.status(404).json("Todo가 존재하지 않습니다.");
    }
    if (todo.UserId !== req.user.id) {
      return res.status(403).json("Todo 삭제 권한이 없습니다.");
    }
    await Todo.destroy({ where: { id: req.params.id } });
    res.json("Todo가 성공적으로 삭제되었습니다.");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
