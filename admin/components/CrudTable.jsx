// admin/components/CrudTable.jsx
import React, { useState, useEffect } from 'react';

export default function CrudTable({ resource, columns }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});

  useEffect(() => {
    fetch('/api/admin/' + resource)
      .then(res => res.json())
      .then(setItems);
  }, [resource]);

  const refresh = () => {
    fetch('/api/admin/' + resource)
      .then(res => res.json())
      .then(setItems);
  };

  const handleCreate = () => {
    fetch('/api/admin/' + resource, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    }).then(() => {
      setNewItem({});
      refresh();
    });
  };

  const handleUpdate = (id, field, value) => {
    fetch('/api/admin/' + resource + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value })
    }).then(refresh);
  };

  const handleDelete = id => {
    fetch('/api/admin/' + resource + '/' + id, { method: 'DELETE' }).then(refresh);
  };

  return (
    <div>
      <h2>{resource}</h2>
      <table>
        <thead>
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              {columns.map(col => (
                <td key={col}>
                  <input
                    value={item[col] || ''}
                    onChange={e => handleUpdate(item.id, col, e.target.value)}
                  />
                </td>
              ))}
              <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
            </tr>
          ))}
          <tr>
            {columns.map(col => (
              <td key={col}>
                <input
                  placeholder={col}
                  value={newItem[col] || ''}
                  onChange={e => setNewItem({ ...newItem, [col]: e.target.value })}
                />
              </td>
            ))}
            <td><button onClick={handleCreate}>Add</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
