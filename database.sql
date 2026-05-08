-- 创建数据库
CREATE DATABASE IF NOT EXISTS my_admin_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 切换到刚创建的数据库
USE my_admin_db;

-- 创建动态路由数据表
CREATE TABLE IF NOT EXISTS routes (
   id INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
   role VARCHAR(50) NOT NULL COMMENT '角色名称 (例如 admin, user)',
   path VARCHAR(255) NOT NULL COMMENT '前端路由路径',
   name VARCHAR(255) NOT NULL COMMENT '路由名称 (唯一)',
   component VARCHAR(255) NOT NULL COMMENT '前端组件名称或路径',
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='动态路由权限表';

-- 清空旧数据 (可选，为了防止重复插入)
TRUNCATE TABLE routes;

-- 插入默认测试数据
INSERT INTO routes (role, path, name, component) VALUES 
('admin', '/dashboard', 'Dashboard', 'Dashboard'),
('admin', '/users', 'UsersManagement', 'Users'),
('admin', '/settings', 'Settings', 'Settings'),
('user', '/dashboard', 'Dashboard', 'Dashboard'),
('user', '/profile', 'Profile', 'Profile');
