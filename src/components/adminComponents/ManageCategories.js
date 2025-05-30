import React, { useState, useEffect } from 'react';
import './ManageCategories.css';
import { useNavigate } from "react-router-dom";

const ManageCategories = () => {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/admin/home');
    };

    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/admin/categories');
            const data = await response.json();
            if (data.code === 0) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error('获取分区列表失败:', error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory)
            });
            const data = await response.json();
            if (data.code === 0) {
                alert('创建成功');
                setNewCategory({ name: '', description: '' });
                fetchCategories();
            }
        } catch (error) {
            alert('创建失败，请重试');
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`/api/admin/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingCategory)
            });
            const data = await response.json();
            if (data.code === 0) {
                alert('更新成功');
                setEditingCategory(null);
                fetchCategories();
            }
        } catch (error) {
            alert('更新失败，请重试');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('确定要删除该分区吗？')) return;
        
        try {
            const response = await fetch(`/api/admin/categories/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.code === 0) {
                alert('删除成功');
                fetchCategories();
            }
        } catch (error) {
            alert('删除失败，请重试');
        }
    };

    return (
        <div className="manage-categories">
            
            <button onClick={handleBackClick} className='backBtn'>
                    返回
            </button>

            <h2>分区管理</h2>
            
            <div className="create-category">
                <h3>创建新分区</h3>
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        placeholder="分区名称"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    />
                    <textarea
                        placeholder="分区描述"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    />
                    <button type="submit">创建</button>
                </form>
            </div>

            <div className="categories-list">
                {categories.map(category => (
                    <div key={category.id} className="category-item">
                        {editingCategory?.id === category.id ? (
                            <div className="category-edit">
                                <input
                                    type="text"
                                    value={editingCategory.name}
                                    onChange={(e) => setEditingCategory({
                                        ...editingCategory,
                                        name: e.target.value
                                    })}
                                />
                                <textarea
                                    value={editingCategory.description}
                                    onChange={(e) => setEditingCategory({
                                        ...editingCategory,
                                        description: e.target.value
                                    })}
                                />
                                <button onClick={() => handleUpdate(category.id)}>
                                    保存
                                </button>
                                <button onClick={() => setEditingCategory(null)}>
                                    取消
                                </button>
                            </div>
                        ) : (
                            <div className="category-info">
                                <h4>{category.name}</h4>
                                <p>{category.description}</p>
                                <div className="category-actions">
                                    <button onClick={() => setEditingCategory(category)}>
                                        编辑
                                    </button>
                                    <button onClick={() => handleDelete(category.id)}>
                                        删除
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCategories;
