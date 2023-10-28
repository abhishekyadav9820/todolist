import React, { useState } from "react";
import { Card, Input, Button, Space, Modal, DatePicker, Tooltip } from "antd";
import {
  CheckSquareOutlined,
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./App.css";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reminderDateTime, setReminderDateTime] = useState(null);

  const handleAddTodo = () => {
    if (newTodo) {
      const todoItem = {
        text: newTodo,
        timestamp: new Date().toLocaleString(),
        reminderTime: null,
      };
      setTodos([...todos, todoItem]);
      setNewTodo("");
    }
  };

  const startEditing = (index) => {
    setEditingTodo(index);
    setEditedText(todos[index].text);
  };

  const handleSaveEdit = (index) => {
    const updatedTodos = [...todos];
    if (updatedTodos[index].text !== editedText) {
      updatedTodos[index].text = editedText;
      updatedTodos[index].timestamp = new Date().toLocaleString();
    }
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const openModal = (index) => {
    setSelectedTodoIndex(index);
    setIsModalVisible(true);
  };

  const handleReminderOk = () => {
    if (selectedTodoIndex !== null && reminderDateTime) {
      const updatedTodos = [...todos];
      updatedTodos[selectedTodoIndex].reminderTime = reminderDateTime;
      setTodos(updatedTodos);

      setTimeout(() => {
        alert(`Reminder: ${updatedTodos[selectedTodoIndex].text}`);
      }, reminderDateTime - Date.now());

      setIsModalVisible(false);
    }
  };

  const handleReminderCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <Card title="To Do Input" bordered={true} style={{ width: "600px" }}>
        <Input
          size="large"
          placeholder="Enter text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button
          type="primary"
          style={{ margin: "10px 0px" }}
          block
          onClick={handleAddTodo}
        >
          Add
        </Button>
        <hr />
        <h2 style={{ textAlign: "center", margin: "10px" }}>To Do List</h2>
        <Space direction="vertical" style={{ width: "100%", margin: "20px 0" }}>
          {todos.length === 0 ? (
            <Card>
            <li>
              <ul style={{ margin: 0, padding: 0 }}>
                <p
                  style={{
                    color: "blue",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  No To Do List
                </p>
              </ul>
            </li>
            </Card>
          ) : (
            todos.map((todo, index) => (
              <Card className="listCard" key={index}  >
                <li>
                  <ul style={{ margin: 0, padding: 0 }}>
                    {editingTodo === index ? (
                      <Input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                    ) : (
                      <p
                        style={{
                          color: "#4181b8",
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                      >
                        {todo.text}
                      </p>
                    )}
                  </ul>
                  <ul style={{ fontWeight: "500" }}>
                    {todo.timestamp}
                  </ul>
                  <div style={{ display: "flex" }}>
                    <ul>
                      {editingTodo === index ? (
                        <Button
                          type="primary"
                          shape="rounded"
                          className="mx-2 text-warning"
                          icon={<CheckSquareOutlined />}
                          onClick={() => handleSaveEdit(index)}
                        ></Button>
                      ) : (
                        <Button
                          type="primary"
                          shape="rounded"
                          className="mx-2 text-warning"
                          icon={<EditOutlined />}
                          onClick={() => startEditing(index)}
                        ></Button>
                      )}
                    </ul>
                    <ul>
                      <Tooltip title={todo.reminderTime ? `Reminder: ${new Date(todo.reminderTime).toLocaleString()}` : 'Set Reminder'}>
                        <Button
                          style={{ backgroundColor: "green", color: "#fff" }}
                          shape="rounded"
                          className="mx-2 text-warning"
                          icon={<ClockCircleOutlined />}
                          onClick={() => openModal(index)}
                        ></Button>
                      </Tooltip>
                    </ul>
                    <ul>
                      <Button
                        type=""
                        style={{ backgroundColor: "red", color: "#fff" }}
                        shape="rounded"
                        className="mx-2 text-warning"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteTodo(index)}
                      ></Button>
                    </ul>
                  
                  </div>
                </li>
              </Card>
            ))
          )}
        </Space>
      </Card>

      <Modal
        title="Set Reminder"
        visible={isModalVisible}
        onOk={handleReminderOk}
        onCancel={handleReminderCancel}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          onChange={(value) => setReminderDateTime(value ? value.valueOf() : null)}
        />
      </Modal>
    </div>
  );
}

export default App;
